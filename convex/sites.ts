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

export const updateSite = mutation({
  args: {
    siteId: v.id("sites"),
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
  },
  handler: async (ctx, args) => {
    // Get existing site to verify ownership and preserve metadata
    const existing = await ctx.db.get(args.siteId);
    
    if (!existing) {
      throw new Error("Site not found");
    }
    
    // Verify user owns the site (Requirement 19.1)
    if (existing.userId !== args.userId) {
      throw new Error("Unauthorized: You can only edit your own sites");
    }
    
    // Validate required fields using shared validation (Requirement 19.3, 19.4, 19.5, 19.6, 19.7, 19.8)
    validateSiteConfig(args);
    
    // Extract fields to update (exclude siteId and userId which are not stored)
    const { siteId, userId, ...updateFields } = args;
    
    // Update site configuration while preserving metadata (Requirements 19.9, 19.10)
    // Note: ctx.db.patch only updates provided fields, so createdAt and views are automatically preserved
    await ctx.db.patch(args.siteId, {
      ...updateFields,
      updatedAt: Date.now(),
    });
    
    return args.siteId;
  },
});
