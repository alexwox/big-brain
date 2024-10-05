import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
  memberships: defineTable({
    orgId: v.string(),
    userId: v.string(),
  }).index("by_orgId_userId", ["orgId", "userId"]),
  documents: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    tokenIdentifier: v.optional(v.string()),
    orgId: v.optional(v.string()),
    embedding: v.optional(v.array(v.float64())),
    fileId: v.id("_storage"),
  })
    .index("by_tokenIdentifier", ["tokenIdentifier"])
    .index("by_orgId", ["orgId"])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["tokenIdentifier", "orgId"],
    }),
  notes: defineTable({
    text: v.string(),
    orgId: v.optional(v.string()),
    embedding: v.optional(v.array(v.float64())),
    tokenIdentifier: v.optional(v.string()),
  })
    .index("by_tokenIdentifier", ["tokenIdentifier"])
    .index("by_orgId", ["orgId"])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["tokenIdentifier", "orgId"],
    }),
  chats: defineTable({
    documentId: v.id("documents"),
    tokenIdentifier: v.string(),
    isHuman: v.boolean(),
    text: v.string(),
  }).index("by_documentId_tokenIdentifier", ["documentId", "tokenIdentifier"]),
  users: defineTable({
    userId: v.string(),
    email: v.string(),
    subscriptionId: v.optional(v.string()),
    endsOn: v.optional(v.number()),
    credits: v.number(),
    name: v.optional(v.string()),
    isAdmin: v.optional(v.boolean()),
    profileImage: v.optional(v.string()),
    isPremium: v.optional(v.boolean()),
  })
    .index("by_userId", ["userId"])
    .index("by_subscriptionId", ["subscriptionId"]),
});