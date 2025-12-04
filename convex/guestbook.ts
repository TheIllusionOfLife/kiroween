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
    // Validation: check length constraints
    if (args.name.length < 1) {
      throw new Error("Name is required!");
    }
    if (args.name.length > 50) {
      throw new Error("Name too long! Keep it under 50 characters.");
    }
    if (args.message.length < 1) {
      throw new Error("Message is required!");
    }
    if (args.message.length > 500) {
      throw new Error("Message too long! Keep it under 500 characters.");
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

// Batch fetch guestbook counts for multiple sites
export const getBatchEntriesCounts = query({
  args: { siteIds: v.array(v.id("sites")) },
  handler: async (ctx, args) => {
    // Fetch all guestbook entries for the given site IDs
    const allEntries = await ctx.db
      .query("guestbookEntries")
      .collect();
    
    // Count entries per site
    const counts: Record<string, number> = {};
    for (const siteId of args.siteIds) {
      counts[siteId] = 0;
    }
    
    for (const entry of allEntries) {
      if (entry.siteId in counts) {
        counts[entry.siteId]++;
      }
    }
    
    return counts;
  },
});
