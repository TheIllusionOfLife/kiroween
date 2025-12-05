---
inclusion: always
---

# Product Overview - 90s Website Generator

## What We're Building

A nostalgic web application that generates authentic 1990s-style personal homepages. Think GeoCities, Angelfire, and Tripod - complete with Comic Sans, animated GIFs, MIDI music, visitor counters, and guestbooks.

## Core Features

### 1. Site Generation
- Form-based generator with live preview
- 6 authentic themes (Neon, Space, Rainbow, Matrix, GeoCities, Angelfire)
- Real-time HTML generation with inline styles
- Download as standalone HTML file

### 2. Template Presets
- 6 one-click starter templates
- Pre-configured personas (Gamer Kid, GeoCities Classic, Webmaster Pro, etc.)
- Demonstrates full range of features
- Fully customizable after loading

### 3. Audio Features
- Background music (BGM) with controls
- Sound effects on interactions
- Period-appropriate MIDI-style audio
- Web-compatible formats (MP3, OGG, WAV)

### 4. Authentication & User Management
- GitHub OAuth via Clerk
- Guest mode (use without signing in)
- Private gallery of saved sites
- User-specific site management

### 5. Social Features
- Working guestbook system
- Visitor tracking (real view counts)
- Public site sharing via unique URLs
- Real-time updates with Convex

### 6. Edit Mode
- Modify saved sites after creation
- Change text, fonts, colors, themes
- Update audio settings
- Preserves creation date and view count

## User Flows

### Guest User Flow
1. Visit homepage
2. Load a template preset or fill form manually
3. See live preview
4. Download site as HTML
5. (Optional) Sign in to save

### Authenticated User Flow
1. Sign in with GitHub
2. Create/edit sites
3. Save to private gallery
4. Share site URLs
5. View guestbook entries
6. Track view counts

### Visitor Flow
1. Visit shared site URL
2. View generated site
3. Sign guestbook
4. Explore other sites

## Quality Standards

### Correctness
- **Property-based testing** - Universal properties verified across all inputs
- **100+ test iterations** - Each property test runs 100 times minimum
- **Spec-driven development** - Requirements → Design → Implementation
- **EARS syntax** - All requirements follow structured format

### User Experience
- **Instant preview** - See changes within 500ms
- **Responsive design** - Works on desktop and mobile
- **Accessibility** - WCAG AA compliance
- **Performance** - Fast load times with edge caching

### Code Quality
- **TypeScript** - Full type safety
- **Tested** - Property tests + unit tests
- **Documented** - Inline comments and steering docs
- **Maintainable** - Clear structure and patterns

## Success Metrics

### MVP Success
- ✅ Users can generate sites without signing in
- ✅ Users can download sites as HTML
- ✅ Authenticated users can save and manage sites
- ✅ Guestbook works and persists data
- ✅ All property tests pass

### Production Success
- 📊 100+ sites generated per week
- 📊 50+ authenticated users
- 📊 80%+ user satisfaction
- 📊 <2s average page load time
- 📊 99.9% uptime

## Development Status

**Phase**: Implementation (Spec-driven development)

**Completed** (Tasks 1-4.1):
- ✅ Clerk authentication with GitHub OAuth
- ✅ Convex schema with user association
- ✅ Zustand store for client state
- ✅ Audio support (BGM + sound effects)
- ✅ Property test for audio features

**In Progress** (Task 5):
- 🔄 Update template presets with audio

**Remaining** (Tasks 5.1-21):
- ⏳ 16 more tasks + property tests
- ⏳ Full site generation implementation
- ⏳ Form components with Zustand integration
- ⏳ Guest mode functionality
- ⏳ Gallery system with user filtering
- ⏳ Edit mode implementation
- ⏳ Guestbook enhancements
- ⏳ Download functionality
- ⏳ Responsive layouts
- ⏳ Error handling
- ⏳ Deployment to Vercel

## Key Constraints

### Technical
- Must work in modern browsers (Chrome, Firefox, Safari, Edge)
- Generated sites must be self-contained (no external dependencies)
- Preview must work in iframe without popups
- Audio must respect browser autoplay policies

### Business
- Free tier sufficient for MVP (Vercel + Convex + Clerk)
- No user data storage beyond site configs
- GitHub OAuth only (no email/password)
- Public site viewing without authentication

### Design
- Authentic 90s aesthetic (intentionally "bad" design)
- Period-accurate features only
- Comic Sans MS required
- Animated GIFs and garish colors encouraged

## Future Enhancements

### Phase 2 (Post-MVP)
- Visual drag-and-drop editor
- More themes and presets
- Custom domain support
- Site analytics dashboard
- Image upload capability

### Phase 3 (Scale)
- Community features (likes, comments)
- Site templates marketplace
- Collaboration (shared editing)
- Export to different formats
- AI-powered content suggestions

## Important Notes

- **⚠️ vibe_coding/ is FROZEN** - Both version1 and version2 are reference only - NEVER modify
- **✅ Root directory is ACTIVE** - All development happens at project root
- vibe_coding/version1 = vanilla JS baseline (frozen for reference)
- vibe_coding/version2 = Next.js reference (frozen for reference)
- All new features are implemented at the project root
- Property tests are mandatory for all features
- Follow spec-driven workflow strictly
