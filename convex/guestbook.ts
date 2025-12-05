import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Validates guestbook entry fields
 * Shared validation logic used by both mutation and tests
 */
export function validateGuestbookEntry(entry: { name: string; message: string }) {
  const name = entry.name.trim();
  const message = entry.message.trim();
  
  if (name.length < 1) {
    throw new Error("Name is required!");
  }
  if (name.length > 50) {
    throw new Error("Name too long! Keep it under 50 characters.");
  }
  if (message.length < 1) {
    throw new Error("Message is required!");
  }
  if (message.length > 500) {
    throw new Error("Message too long! Keep it under 500 characters.");
  }
}

export const sign = mutation({
  args: {
    siteId: v.id("sites"),
    name: v.string(),
    message: v.string(),
    email: v.optional(v.string()),
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Validate using shared validation function
    validateGuestbookEntry({ name: args.name, message: args.message });
    
    // Trim whitespace after validation
    const name = args.name.trim();
    const message = args.message.trim();

    const entryId = await ctx.db.insert("guestbookEntries", {
      siteId: args.siteId,
      name: name,
      message: message,
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
      .withIndex("by_site", (q) => q.eq("siteId", args.siteId))
      .order("desc")
      .take(50);
  },
});

export const getEntriesCount = query({
  args: { siteId: v.id("sites") },
  handler: async (ctx, args) => {
    const entries = await ctx.db
      .query("guestbookEntries")
      .withIndex("by_site", (q) => q.eq("siteId", args.siteId))
      .collect();
    return entries.length;
  },
});

// Batch fetch guestbook counts for multiple sites
export const getBatchEntriesCounts = query({
  args: { siteIds: v.array(v.id("sites")) },
  handler: async (ctx, args) => {
    // Use index-backed queries for each site (more efficient than full table scan)
    const counts: Record<string, number> = {};
    
    // Fetch counts for each site using the by_site index
    await Promise.all(
      args.siteIds.map(async (siteId) => {
        const entries = await ctx.db
          .query("guestbookEntries")
          .withIndex("by_site", (q) => q.eq("siteId", siteId))
          .collect();
        counts[siteId] = entries.length;
      })
    );
    
    return counts;
  },
});
