---
inclusion: always
---

# 90s Website Generator - Project Overview

## Project Context

This is a fun, nostalgic web application that generates authentic 1990s-style personal homepages. Think GeoCities, Angelfire, and Tripod - complete with Comic Sans, animated GIFs, MIDI music, and all the glorious chaos of early web design.

## Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Zustand (client state)
- React 19

**Backend:**
- Convex (real-time database)
- Clerk (GitHub OAuth authentication)

**Testing:**
- Vitest (unit tests)
- fast-check (property-based testing)

**Deployment:**
- Vercel (frontend + CDN)
- Convex Cloud (database)

## Project Structure

```
├── vibe_coding/            # ⚠️ FROZEN - DO NOT MODIFY ⚠️
│   ├── version1/          # Frozen vanilla JS baseline
│   └── version2/          # Frozen Next.js reference
├── app/                    # ✅ ACTIVE - Next.js App Router pages
│   ├── layout.tsx         # Root layout with Clerk
│   ├── page.tsx           # Home page (generator)
│   ├── gallery/           # Private gallery (auth required)
│   ├── site/[id]/         # Individual site pages (public)
│   ├── sign-in/           # Clerk sign-in
│   └── sign-up/           # Clerk sign-up
├── components/            # React components
│   ├── Header.tsx         # Navigation with auth
│   ├── generator/         # Site generator form
│   ├── guestbook/         # Guestbook widget
│   └── ui/                # shadcn/ui components
├── lib/                   # Utilities and logic
│   ├── site-generator.ts  # HTML generation
│   ├── store.ts           # Zustand state
│   ├── themes.ts          # Visual themes
│   ├── presets.ts         # Template presets
│   └── __tests__/         # Test files
├── convex/                # Convex backend
│   ├── schema.ts          # Database schema
│   ├── sites.ts           # Site queries/mutations
│   └── guestbook.ts       # Guestbook queries/mutations
└── middleware.ts          # Clerk auth middleware
```

## Key Features

1. **Site Generation** - Form-based generator with live preview
2. **6 Themes** - Neon, Space, Rainbow, Matrix, GeoCities, Angelfire
3. **6 Template Presets** - One-click starter templates
4. **Audio Support** - BGM and sound effects
5. **Authentication** - GitHub OAuth via Clerk
6. **Guest Mode** - Use without signing in (can't save)
7. **Private Gallery** - User's saved sites
8. **Guestbook** - Visitors can leave messages
9. **Edit Mode** - Modify saved sites
10. **Download** - Export as standalone HTML

## Development Workflow

We're using **spec-driven development**:
1. ✅ Requirements (EARS syntax, INCOSE rules)
2. ✅ Design (architecture, correctness properties)
3. 🔄 Implementation (tasks with property tests)
4. ⏳ Deployment

## Current Status

**Completed:**
- Task 1: Clerk authentication setup
- Task 2: Convex schema updates
- Task 3: Zustand store implementation
- Task 4: Audio support in site generator
- Task 4.1: Property test for audio features

**In Progress:**
- Task 5: Update template presets with audio

**Remaining:** 16 tasks + property tests

## Important Notes

- **⚠️ vibe_coding/ is FROZEN** - Both version1 and version2 are reference only - NEVER modify
- **✅ Root directory is ACTIVE** - All development happens at project root
- All new features are implemented at the project root
- vibe_coding/version1 = vanilla JS baseline (frozen)
- vibe_coding/version2 = Next.js reference (frozen)
- Property tests must run 100 iterations minimum
- Each property test must be tagged with format: `**Feature: 90s-website-generator, Property N: [text]**`
