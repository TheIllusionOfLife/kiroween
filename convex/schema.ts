import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sites: defineTable({
    // User association (optional for backward compatibility with old test data)
    userId: v.optional(v.string()), // Clerk user ID
    
    // Basic info
    name: v.string(),
    hobby: v.string(),
    email: v.optional(v.string()),
    theme: v.string(),
    
    // Feature toggles
    addMusic: v.boolean(),
    addCursor: v.boolean(),
    addGifs: v.boolean(),
    addPopups: v.optional(v.boolean()),
    addRainbowText: v.optional(v.boolean()),
    
    // Audio settings
    bgmTrack: v.optional(v.string()),
    soundEffects: v.optional(v.boolean()), // Optional for backward compatibility
    
    // Customization (for edit mode)
    customFonts: v.optional(
      v.object({
        heading: v.optional(v.string()),
        body: v.optional(v.string()),
      })
    ),
    customColors: v.optional(
      v.object({
        background: v.optional(v.string()),
        text: v.optional(v.string()),
        links: v.optional(v.string()),
      })
    ),
    
    // Metadata
    createdAt: v.number(),
    updatedAt: v.optional(v.number()), // Optional for backward compatibility
    views: v.number(),
  })
    .index("by_created_at", ["createdAt"])
    .index("by_user", ["userId"])
    .index("by_user_created", ["userId", "createdAt"]),

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

  users: defineTable({
    clerkId: v.string(),
    githubUsername: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),
});
