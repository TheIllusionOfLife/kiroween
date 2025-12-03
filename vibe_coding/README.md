# 90s Website Generator - Vibe Coding Project

This project explores building a hilarious 90s-style website generator in two iterations.

## Project Structure

### Version 1: Vanilla JavaScript
Location: `version1/`

A pure vanilla JS implementation with no dependencies. Perfect for understanding the core concept.

**Features:**
- 6 retro themes
- MIDI music, sparkle cursors, maximum GIFs mode
- All classic 90s elements (blinking text, marquees, hit counters, etc.)

**To run:** Simply open `version1/index.html` in your browser.

### Version 2: Modern Tech Stack
Location: `version2/`

A modern implementation using Next.js, TypeScript, Tailwind CSS, shadcn/ui, and Convex.

**Tech Stack:**
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Convex for real-time database
- Vercel-ready deployment

**To run:**
```bash
cd version2
npm install
npx convex dev  # Terminal 1
npm run dev     # Terminal 2
```

Then open http://localhost:3000

## Current Status

✅ Version 1: Complete and working
✅ Version 2: Core generator working with Convex integration
🚧 Gallery view (planned)
🚧 Canvas cursor trails (planned)
🚧 More 90s effects (planned)

## Next Steps

After exploring both versions, we'll use a **spec-driven approach** to finalize the feature set and build the production version. This exploration phase helps us understand:

1. What features are most fun/valuable
2. Which tech stack works best
3. What the user experience should be
4. How to structure the codebase

## Philosophy

This is "vibe coding" - exploring and having fun while building something ridiculous but technically sound. The goal is to learn modern tools while creating something that makes people smile.

---

**Note:** Both versions are fully functional. Version 1 is simpler and works anywhere. Version 2 adds modern features like database storage, sharing, and a polished UI.
