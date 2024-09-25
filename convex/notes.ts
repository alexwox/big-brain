import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";
import { query } from "./_generated/server";

export const getNotes = query({
    args: {},
    handler: async (ctx) => {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
        if (!userId) {
            return null;
        }
        const notes = await ctx.db
            .query("notes")
            .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
            .order("desc")
            .collect();
        return notes;
    },
});

export const getNote = query({
    args: {
        noteId: v.id("notes"),
    },
    handler: async (ctx, args) => {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
        if (!userId) {
            return null;
        }

        const note = await ctx.db.get(args.noteId);

        if (!note) {
            return null;
        }

        if (note?.tokenIdentifier !== userId) {
            return null;
        }

        return note;
    },
});

export const createNote = mutation({
    args: {
        text: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

        if (!userId) {
            throw new ConvexError("Unauthorized");
            return null;
        }

        const note = await ctx.db.insert("notes", {
            text: args.text,
            tokenIdentifier: userId,
        });
        return note;
    },
}); 

export const deleteNote = mutation({
    args: {
        noteId: v.id('notes'),
    },
    handler: async (ctx, args) => {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

        const note = await ctx.db.get(args.noteId);

        if (!note) {
            throw new ConvexError("Note not found");
        }

        if (note?.tokenIdentifier !== userId) {
            throw new ConvexError("Unauthorized");
        }

        await ctx.db.delete(args.noteId);
    },
})