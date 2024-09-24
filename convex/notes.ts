import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";



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