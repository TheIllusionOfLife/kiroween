import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { validateSiteConfig } from "./validation";

export const saveSite = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    hobby: v.string(),
    email: v.optional(v.string()),
    theme: v.string(),
    addMusic: v.boolean(),
    addCursor: v.boolean(),
    addGifs: v.boolean(),
    addPopups: v.optional(v.boolean()),
    addRainbowText: v.optional(v.boolean()),
    bgmTrack: v.optional(v.string()),
    soundEffects: v.boolean(),
    customFonts: v.optional(v.object({
      heading: v.optional(v.string()),
      body: v.optional(v.string()),
    })),
    customColors: v.optional(v.object({
      background: v.optional(v.string()),
      text: v.optional(v.string()),
      links: v.optional(v.string()),
    })),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    // Validate required fields using shared validation (Requirement 6.5)
    validateSiteConfig(args);
    
    // Store site with user association (Requirements 6.1, 6.2, 6.6)
    const siteId = await ctx.db.insert("sites", {
      ...args,
      views: 0, // Initialize view count to zero (Requirement 6.3)
      updatedAt: args.createdAt,
    });
    
    // Return site ID for retrieval (Requirement 6.4)
    return siteId;
  },
});

// Keep create as an alias for backward compatibility
export const create = saveSite;

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("sites")
      .order("desc")
      .take(50);
  },
});

export const getUserSites = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sites")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const get = query({
  args: { id: v.id("sites") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const incrementViews = mutation({
  args: { id: v.id("sites") },
  handler: async (ctx, args) => {
    const site = await ctx.db.get(args.id);
    if (site) {
      await ctx.db.patch(args.id, {
        views: site.views + 1,
      });
    }
  },
});
