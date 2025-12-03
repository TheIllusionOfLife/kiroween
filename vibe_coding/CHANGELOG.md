# Changelog

## [Unreleased] - 2024-12-03

### Added - Tier 1 Quick Wins ✅

**Visual Enhancements:**
- ✅ Tiled background patterns for all 6 themes (starfield for space, patterns for geocities, etc.)
- ✅ Animated horizontal dividers with shimmer effect
- ✅ Rainbow text option for names (gradient text effect)
- ✅ ASCII art welcome banner
- ✅ "Best viewed at 800x600" warning message

**Interactive Features:**
- ✅ Alert popup on page load ("Welcome to [name]'s site!")
- ✅ Confirm dialog when leaving page ("Are you sure you want to leave?")
- ✅ Proper "Last updated" timestamp using actual creation time

**Gallery & Persistence:**
- ✅ Gallery page showing all generated sites
- ✅ Individual site pages with shareable URLs
- ✅ Real visitor counter using Convex (increments on each view)
- ✅ View count displayed on gallery cards and site pages
- ✅ Download functionality for individual sites from gallery

**Both Versions Updated:**
- Version 1 (vanilla JS) and Version 2 (Next.js) now have feature parity
- All new options available in both implementations

### Technical Improvements
- Updated Convex schema to support new fields (addPopups, addRainbowText)
- Added proper TypeScript types for new configuration options
- Created dynamic routes for individual site viewing
- Implemented view tracking with automatic increment

### What's Working Now
1. ✅ Tiled backgrounds (theme-specific patterns)
2. ✅ Rainbow text effect
3. ✅ Animated dividers
4. ✅ ASCII art
5. ✅ Alert/confirm popups
6. ✅ Gallery page with all sites
7. ✅ Real visitor counter
8. ✅ Individual site pages
9. ✅ Download from gallery

### Still Temporary/Mock
- ICQ numbers (random)
- Guestbook (placeholder)
- WebRing links (point to #)
- Email validation (basic)

### Next Up (Tier 2)
- Scrolling status bar text
- More badge variations
- Browser detection warnings
- Canvas-based cursor trail
- Working guestbook
- Share functionality
- Template presets
