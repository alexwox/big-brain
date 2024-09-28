import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  memberships: defineTable({
    orgId: v.string(),
    user: v.string(),
  }),
  documents: defineTable({ 
    title: v.string() ,
    tokenIdentifier: v.optional(v.string()),
    fileId: v.id("_storage"),
    orgId: v.optional(v.string()),
    description: v.optional(v.string()),
    embedding: v.optional(v.array(v.float64())),
  }).index('by_tokenIdentifier', ['tokenIdentifier'])
  .index('by_orgId', ['orgId'])
  .vectorIndex("by_embedding", {
    vectorField: "embedding",
    dimensions: 1536,
    filterFields: ["tokenIdentifier"],
  }),
  notes: defineTable({ 
    text: v.string() ,
    tokenIdentifier: v.string(),  
    embedding: v.optional(v.array(v.float64())),
  }).index('by_tokenIdentifier', ['tokenIdentifier'])
  .vectorIndex("by_embedding", {
    vectorField: "embedding",
    dimensions: 1536,
    filterFields: ["tokenIdentifier"],
  }),
  chats: defineTable({ 
    documentId: v.id("documents"), 
    tokenIdentifier: v.string(),
    text: v.string(),
    isHuman: v.boolean(),
  }).index('by_documentId_tokenIdentifier', ["documentId", 'tokenIdentifier'])

});
