import OpenAI from "openai";

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

const openai = new OpenAI(
    {
        apiKey: process.env.OPENAI_API_KEY,
    }
);

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const getDocuments = query({
    async handler(ctx) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

        if (!userId) {
            return [];
        }
        return await ctx.db.query('documents')
            .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', userId))
            .collect();
    }
})

export const getDocument = query({
    args: {
        documentId: v.id('documents'),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

        if (!userId) {
            return null;
        }

        const document = await ctx.db.get(args.documentId)

        if (!document) {
            return null;
        }

        if (document.tokenIdentifier !== userId) {
            return null;
        }

        return { ...document, documentUrl: await ctx.storage.getUrl(document.fileId) };
    }
})

export const createDocument = mutation({
    args: {
        title: v.string(),
        fileId: v.id('_storage'),
    },

    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
        console.log(userId);
        if (!userId) {
            throw new ConvexError('Unauthorized');
        }

        await ctx.db.insert('documents', {
            title: args.title,
            tokenIdentifier: userId,
            fileId: args.fileId,
        })
    },
})

export const askQuestion = action({
    args: {
        question: v.string(),
        documentId: v.id('documents'),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
        console.log(userId);

        if (!userId) {
            throw new ConvexError('Unauthorized');
        }

        const document = await ctx.runQuery(api.documents.getDocument, {
            documentId: args.documentId,
        })

        if (!document) {
            throw new ConvexError('Document not found');
        }

        const file = await ctx.storage.get(document.fileId);

        if (!file) {
            throw new ConvexError('File not found');
        }

        const text = await file.text()
        const completion: OpenAI.Chat.Completions.ChatCompletion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system", content: `
                    Given the following text
                    Text: ${text}
                    `
                },
                {
                    role: "user",
                    content: `
                    Answer the question based on the text.
                    Question: ${args.question}
                    `,
                },
            ],
        });

        console.log(file.text());
        console.log(completion.choices[0].message);

        return completion.choices[0].message.content;
    },
})







