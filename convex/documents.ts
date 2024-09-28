import OpenAI from "openai";

import { internalAction, internalMutation, mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { internalQuery } from "./_generated/server";
import { useQuery } from "convex/react";
import { getChatsForDocument } from "./chats";


function truncateHistory(chats: any[], maxLength: number): string {
    let history = '';
    for (let i = chats.length - 1; i >= 0; i--) {
      const chat = chats[i];
      const chatString = `${chat.isHuman ? "You" : "AI"}: ${chat.text}\n`;
      if (history.length + chatString.length > maxLength) {
        break;
      }
      history = chatString + history;
    }
    return history.trim();
}

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

export const hasOrgAccess = async (ctx: QueryCtx, orgId: string) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
    if (!userId) {
        return false;
    }

    const membership = await ctx.db.query('memberships')
        .withIndex('by_orgId_userId', (q) => q.eq('orgId', orgId).eq('userId', userId))
        .first();

    return !!membership;
}

export const getDocuments = query({
    args: {
        orgId: v.optional(v.string()),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

        if (!userId) {
            return null;
        }

        if (args.orgId) {
            const isMember = await hasOrgAccess(ctx, args.orgId)
            if (!isMember) {
                return undefined;
            }
            return await ctx.db.query('documents')
                .withIndex('by_orgId', (q) => q.eq('orgId', args.orgId))
                .collect();
        } else {
            return await ctx.db.query('documents')
                .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', userId))
                .collect();
        }
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


export async function embed(text: string) {
    const embedding = await openai.embeddings.create({
        input: text,
        model: "text-embedding-3-small",
        dimensions: 1536,
    });
    return embedding.data[0].embedding;
}

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

        const documentId = await ctx.db.insert('documents', {
            title: args.title,
            tokenIdentifier: userId,
            fileId: args.fileId,
            description: "",
        })
        await ctx.scheduler.runAfter(0, internal.documents.generateDescription, {
            documentId: documentId,
            fileId: args.fileId,

        });
    },
})

export const updateDocumentDescription = internalMutation({
    args: {
        documentId: v.id('documents'),
        description: v.string(),
        embedding: v.array(v.float64()),
    },
    async handler(ctx, args) {
        await ctx.db.patch(args.documentId, {
            description: args.description,
            embedding: args.embedding,
        });
    },
});

export const generateDescription = internalAction({
    args: {
        fileId: v.id('_storage'),
        documentId: v.id('documents'),
    },

    async handler(ctx, args) {

        const file = await ctx.storage.get(args.fileId);

        if (!file) {
            throw new ConvexError('File not found');
        }

        const text = await file.text()

        const completion: OpenAI.Chat.Completions.ChatCompletion = await openai.chat.completions.create({
            model: "gpt-4",
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
                    Generate a very short and concise 10 word description based on the text.
                    `,
                },
            ],
        });

        const description = completion.choices[0].message.content ?? 'Could not generate description';

        const embedding = await embed(description)
        await ctx.runMutation(internal.documents.updateDocumentDescription, {
            documentId: args.documentId,
            description: description,
            embedding,
        });
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
        const truncatedHistory = truncateHistory(chats, 1000);

        const completion: OpenAI.Chat.Completions.ChatCompletion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system", content: `
                    Given the following text
                    Text: ${text}
                    and the following conversation history
                    History: ${truncatedHistory}
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

export const deleteDocument = mutation({
    args: {
        documentId: v.id('documents'),
    },
    async handler(ctx, args) {
        const accessObj = await hasAccessToDocument(ctx, args.documentId)

        if (!accessObj) {
            throw new ConvexError('Access denied');
        }
        await ctx.storage.delete(accessObj.document.fileId);
        await ctx.db.delete(args.documentId);
    },
})






