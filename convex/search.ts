import { v } from "convex/values";
import { action, internalAction } from "./_generated/server";
import { embed } from "./notes";
import { ConvexError } from "convex/values";
import { api } from "./_generated/api";
import { Doc } from "./_generated/dataModel";
export const searchAction = action({
    args: {
        search: v.string(),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if (!userId) {
            throw new ConvexError("Unauthorized");
        }

        const embedding = await embed(args.search);

        const noteResults = await ctx.vectorSearch("notes", "by_embedding", {
            vector: embedding,
            limit: 5,
            filter: (q) => q.eq("tokenIdentifier", userId),
        });

        const documentResults = await ctx.vectorSearch("documents", "by_embedding", {
            vector: embedding,
            limit: 5,
            filter: (q) => q.eq("tokenIdentifier", userId),
        });

        const records: (
            | { type: "notes"; score: number; record: Doc<"notes"> }
            | { type: "documents"; score: number; record: Doc<"documents"> }
        )[] = [];

        await Promise.all(
            noteResults
                .map(async (result) => {
                    const note = await ctx.runQuery(api.notes.getNote, {
                        noteId: result._id,
                    });
                    if (!note) {
                        return;
                    }

                    records.push({
                        type: "notes",
                        score: result._score,
                        record: note
                    });
                })
        );

        await Promise.all(
            documentResults
                .map(async (result) => {
                    const document = await ctx.runQuery(api.documents.getDocument, {
                        documentId: result._id,
                    });
                    if (!document) {
                        return;
                    }

                    records.push({ type: "documents", score: result._score, record: document });
                })
        );

        records.sort((a, b) => b.score - a.score);
        return records;
    },
});