import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";
import { ConvexError } from "convex/values";

export const getChatsForDocument = internalQuery({
    args: {
        documentId: v.id("documents"),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) {
            return [];
        }
        return await ctx.db
        .query("chats")
        .withIndex(
            "by_documentId_tokenIdentifier",
            (q) => q
            .eq("documentId", args.documentId)
            .eq("tokenIdentifier", userId)
        );
    }
})


export const createChatRecord = internalMutation({
    args: {
        documentId: v.id("documents"),
        tokenIdentifier: v.string(),
        text: v.string(),
        isHuman: v.boolean(),
    },
    async handler(ctx, args) {
        const chatRecord = await ctx.db.insert("chats", {
            documentId: args.documentId,
            tokenIdentifier: args.tokenIdentifier,
            text: args.text,
            isHuman: args.isHuman,
        });
        return chatRecord;
    }
});