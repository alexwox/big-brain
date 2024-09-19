import OpenAI from "openai";

import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { internalQuery } from "./_generated/server";
import { useQuery } from "convex/react";
import { getChatsForDocument } from "./chats";


export async function hasAccessToDocument(
    ctx: MutationCtx | QueryCtx,
    documentId: Id<"documents">
) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

    if (!userId) {
        return null;
    }

    const document = await ctx.db.get(documentId)

    if (!document) {
        return null;
    }

    if (document.tokenIdentifier !== userId) {
        return null;
    }

    return { document, userId };
}

export const hasAccessToDocumentQuery = internalQuery({
    args: {
        documentId: v.id('documents'),
    },
    async handler(ctx, args) {
        return await hasAccessToDocument(ctx, args.documentId)
    }
})

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
        const accessObj = await hasAccessToDocument(ctx, args.documentId)

        if (!accessObj) {
            return null;
        }

        return { ...accessObj.document, documentUrl: await ctx.storage.getUrl(accessObj.document.fileId) };
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

        const chats = await ctx.runQuery(
            api.chats.getChatsForDocument,
            {
                documentId: args.documentId,
            }
        );

        const accessObj = await ctx.runQuery(
            internal.documents.hasAccessToDocumentQuery,
            {
                documentId: args.documentId,
            }
        );


        if (!accessObj) {
            throw new ConvexError('Access denied');
        }

        const file = await ctx.storage.get(accessObj.document.fileId);

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
                    and the following conversation history
                    History: ${chats.map((chat) => `${chat.isHuman ? "You" : "AI"}: ${chat.text}`).join("\n")}
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

        await ctx.runMutation(internal.chats.createChatRecord, {
            documentId: args.documentId,
            tokenIdentifier: accessObj.userId,
            text: args.question,
            isHuman: true,
        });

        const response = completion.choices[0].message.content ?? 'Could not generate answer';

        await ctx.runMutation(internal.chats.createChatRecord, {
            documentId: args.documentId,
            tokenIdentifier: accessObj.userId,
            text: response,
            isHuman: false,
        });

        return response
    },
})







