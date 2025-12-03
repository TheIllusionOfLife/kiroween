import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const sign = mutation({
  args: {
    siteId: v.id("sites"),
    name: v.string(),
    message: v.string(),
    email: v.optional(v.string()),
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Simple spam protection: limit message length
    if (args.message.length > 500) {
      throw new Error("Message too long! Keep it under 500 characters.");
    }
    if (args.name.length > 50) {
      throw new Error("Name too long! Keep it under 50 characters.");
    }

    const entryId = await ctx.db.insert("guestbookEntries", {
      siteId: args.siteId,
      name: args.name,
      message: args.message,
      email: args.email,
      website: args.website,
      timestamp: Date.now(),
    });
    return entryId;
  },
});

export const getEntries = query({
  args: { siteId: v.id("sites") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("guestbookEntries")
      .filter((q) => q.eq(q.field("siteId"), args.siteId))
      .order("desc")
      .take(50);
  },
});

export const getEntriesCount = query({
  args: { siteId: v.id("sites") },
  handler: async (ctx, args) => {
    const entries = await ctx.db
      .query("guestbookEntries")
      .filter((q) => q.eq(q.field("siteId"), args.siteId))
      .collect();
    return entries.length;
  },
});
