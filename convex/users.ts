import { v } from "convex/values";
import { internalMutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const updateSubscription = internalMutation({
  args: {
    userId: v.id("users"),
    subscriptionId: v.string(),
    endsOn: v.number(),
  },
  handler: async (ctx, args) => {
    const { userId, subscriptionId, endsOn } = args;
    await ctx.db.patch(userId, {
      subscriptionId,
      subscriptionStatus: "active",
      subscriptionEndsOn: new Date(endsOn),
    });
  },
});

export const updateSubscriptionBySubId = internalMutation({
  args: {
    subscriptionId: v.string(),
    endsOn: v.number(),
  },
  handler: async (ctx, args) => {
    const { subscriptionId, endsOn } = args;
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("subscriptionId"), subscriptionId))
      .first();

    if (user) {
      await ctx.db.patch(user._id, {
        subscriptionStatus: "active",
        subscriptionEndsOn: new Date(endsOn),
      });
    }
  },
});

export const cancelSubscription = internalMutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      subscriptionStatus: "canceled",
      subscriptionId: undefined,
      subscriptionEndsOn: undefined,
    });
  },
});

// Add more user-related mutations and queries as needed
