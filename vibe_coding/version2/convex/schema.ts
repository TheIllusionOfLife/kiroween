import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sites: defineTable({
    name: v.string(),
    hobby: v.string(),
    email: v.optional(v.string()),
    theme: v.string(),
    addMusic: v.boolean(),
    addCursor: v.boolean(),
    addGifs: v.boolean(),
    addPopups: v.optional(v.boolean()),
    addRainbowText: v.optional(v.boolean()),
    createdAt: v.number(),
    views: v.number(),
  }).index("by_created_at", ["createdAt"]),

  guestbookEntries: defineTable({
    siteId: v.id("sites"),
    name: v.string(),
    message: v.string(),
    email: v.optional(v.string()),
    website: v.optional(v.string()),
    timestamp: v.number(),
  })
    .index("by_site", ["siteId"])
    .index("by_timestamp", ["timestamp"]),
});
