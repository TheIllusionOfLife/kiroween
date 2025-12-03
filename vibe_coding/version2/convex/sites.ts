import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    name: v.string(),
    hobby: v.string(),
    email: v.optional(v.string()),
    theme: v.string(),
    addMusic: v.boolean(),
    addCursor: v.boolean(),
    addGifs: v.boolean(),
  },
  handler: async (ctx, args) => {
    const siteId = await ctx.db.insert("sites", {
      ...args,
      createdAt: Date.now(),
      views: 0,
    });
    return siteId;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("sites")
      .order("desc")
      .take(50);
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
