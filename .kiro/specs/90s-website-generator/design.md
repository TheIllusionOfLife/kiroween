# Design Document: 90s Website Generator

## Overview

The 90s Website Generator is a full-stack web application that enables users to create authentic 1990s-style personal homepages through a modern, user-friendly interface. The system combines nostalgic aesthetics with contemporary web technologies to deliver a fun, functional experience.

### Core Capabilities

- **Site Generation**: Transform user inputs into complete, self-contained HTML websites with period-accurate styling
- **Template System**: Six pre-configured personas showcasing the full range of customization options
- **Real-Time Preview**: Live iframe rendering of generated sites as users configure them
- **Persistence Layer**: Database storage for authenticated users to save and manage their creations
- **Social Features**: Guestbook system allowing visitors to leave messages on generated sites
- **Edit Capability**: Post-creation editing of content, styling, and configuration
- **Guest Mode**: Full generation and preview access without authentication
- **Audio Integration**: Background music and sound effects for authentic multimedia experience

### Technical Foundation

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Convex (real-time database with reactive queries)
- **Authentication**: Clerk (GitHub OAuth)
- **State Management**: Zustand (client state), Convex (server state)
- **Deployment**: Vercel (frontend + CDN), Convex Cloud (database)

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Vercel Edge CDN                       │
│                    (Global Distribution)                     │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   Next.js Application                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Pages      │  │  Components  │  │   Lib/Utils  │     │
│  │  - Home      │  │  - Generator │  │  - Site Gen  │     │
│  │  - Gallery   │  │  - Guestbook │  │  - Themes    │     │
│  │  - Site/[id] │  │  - UI (shad) │  │  - Presets   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Zustand Store (Client State)               │  │
│  │  - Form values  - UI state  - Edit mode             │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Convex Client
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    Convex Backend                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Queries    │  │  Mutations   │  │   Schema     │     │
│  │  - getSites  │  │  - saveSite  │  │  - sites     │     │
│  │  - getGuest  │  │  - signGuest │  │  - guestbook │     │
│  │  - increment │  │  - updateSite│  │  - users     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Real-Time Reactive Queries                   │  │
│  │  Auto-updates, Caching, Optimistic Updates          │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                    Clerk Authentication                       │
│  GitHub OAuth → Session Management → User Context           │
└──────────────────────────────────────────────────────────────┘
```

### Data Flow

**Site Generation Flow:**
1. User fills form (or loads preset) → Zustand store updates
2. Store change triggers preview regeneration
3. Site generator creates HTML string from configuration
4. Preview iframe renders HTML
5. User clicks "Save" → Convex mutation stores config + user ID
6. Real-time query updates gallery immediately

**Site Viewing Flow:**
1. Visitor navigates to `/site/[id]`
2. Next.js fetches site config from Convex
3. Site generator creates HTML from config
4. Page renders preview + guestbook side-by-side
5. View count increments via Convex mutation
6. Guestbook entries load via reactive query

**Edit Flow:**
1. User clicks "Edit" on their site
2. System loads config into Zustand store
3. Form populates with existing values
4. User modifies fields → preview updates
5. User saves → Convex mutation updates config
6. Preserves creation date and view count

## Components and Interfaces

### Frontend Components

#### GeneratorForm Component
**Purpose**: Main interface for site configuration

**Props**:
```typescript
interface GeneratorFormProps {
  initialConfig?: SiteConfig;
  onGenerate: (config: SiteConfig) => void;
  onSave?: (config: SiteConfig) => Promise<string>;
  mode: 'create' | 'edit';
}
```

**Responsibilities**:
- Render form fields (name, hobby, email, theme selector)
- Display template preset cards
- Handle feature toggles (cursor, GIFs, popups, rainbow text)
- Manage audio settings (BGM track, sound effects)
- Validate inputs before submission
- Trigger preview updates via Zustand

**State Management**:
- Uses Zustand store for form values
- Debounces preview updates (500ms)
- Validates on blur and submit

#### PreviewPane Component
**Purpose**: Real-time iframe preview of generated site

**Props**:
```typescript
interface PreviewPaneProps {
  html: string;
  loading: boolean;
}
```

**Responsibilities**:
- Render HTML in sandboxed iframe
- Handle iframe load events
- Display loading state
- Provide download button

#### GuestbookWidget Component
**Purpose**: Display and submit guestbook entries

**Props**:
```typescript
interface GuestbookWidgetProps {
  siteId: string;
}
```

**Responsibilities**:
- Fetch entries via Convex query
- Render entry list with timestamps
- Provide submission form
- Validate input (name 1-50 chars, message 1-500 chars)
- Handle real-time updates

#### GalleryCard Component
**Purpose**: Display site summary in gallery

**Props**:
```typescript
interface GalleryCardProps {
  site: {
    _id: string;
    name: string;
    theme: string;
    createdAt: number;
    views: number;
    guestbookCount: number;
  };
  onEdit?: () => void;
  onDelete?: () => void;
}
```

**Responsibilities**:
- Show site metadata
- Display theme badge
- Show view and guestbook counts
- Provide edit/delete actions for owner

### Backend Interfaces

#### Convex Schema

```typescript
// sites table
{
  _id: Id<"sites">,
  userId: string,              // Clerk user ID
  name: string,
  hobby: string,
  email?: string,
  theme: string,
  addCursor: boolean,
  addGifs: boolean,
  addPopups: boolean,
  addRainbowText: boolean,
  bgmTrack?: string,           // Audio file reference
  soundEffects: boolean,
  customFonts?: {
    heading?: string,
    body?: string
  },
  customColors?: {
    background?: string,
    text?: string,
    links?: string
  },
  createdAt: number,
  updatedAt: number,
  views: number
}

// guestbookEntries table
{
  _id: Id<"guestbookEntries">,
  siteId: Id<"sites">,
  name: string,
  message: string,
  email?: string,
  website?: string,
  timestamp: number
}

// users table (synced from Clerk)
{
  _id: Id<"users">,
  clerkId: string,
  githubUsername: string,
  avatarUrl: string,
  createdAt: number
}
```

#### Convex Queries

```typescript
// Get user's sites
export const getUserSites = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sites")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  }
});

// Get site by ID
export const getSite = query({
  args: { siteId: v.id("sites") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.siteId);
  }
});

// Get guestbook entries
export const getGuestbookEntries = query({
  args: { siteId: v.id("sites") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("guestbookEntries")
      .withIndex("by_site", (q) => q.eq("siteId", args.siteId))
      .order("asc")
      .collect();
  }
});
```

#### Convex Mutations

```typescript
// Save new site
export const saveSite = mutation({
  args: { 
    userId: v.string(),
    config: v.object({ /* SiteConfig fields */ })
  },
  handler: async (ctx, args) => {
    const siteId = await ctx.db.insert("sites", {
      ...args.config,
      userId: args.userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      views: 0
    });
    return siteId;
  }
});

// Update existing site
export const updateSite = mutation({
  args: {
    siteId: v.id("sites"),
    config: v.object({ /* SiteConfig fields */ })
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.siteId);
    await ctx.db.patch(args.siteId, {
      ...args.config,
      updatedAt: Date.now(),
      // Preserve createdAt and views
      createdAt: existing.createdAt,
      views: existing.views
    });
  }
});

// Increment view count
export const incrementViews = mutation({
  args: { siteId: v.id("sites") },
  handler: async (ctx, args) => {
    const site = await ctx.db.get(args.siteId);
    await ctx.db.patch(args.siteId, {
      views: site.views + 1
    });
  }
});

// Sign guestbook
export const signGuestbook = mutation({
  args: {
    siteId: v.id("sites"),
    name: v.string(),
    message: v.string(),
    email: v.optional(v.string()),
    website: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    // Validate lengths
    if (args.name.length < 1 || args.name.length > 50) {
      throw new Error("Name must be 1-50 characters");
    }
    if (args.message.length < 1 || args.message.length > 500) {
      throw new Error("Message must be 1-500 characters");
    }
    
    await ctx.db.insert("guestbookEntries", {
      siteId: args.siteId,
      name: args.name,
      message: args.message,
      email: args.email,
      website: args.website,
      timestamp: Date.now()
    });
  }
});
```

### Site Generator Module

**Purpose**: Core logic for generating HTML from configuration

```typescript
interface SiteConfig {
  name: string;
  hobby: string;
  email?: string;
  theme: string;
  addCursor: boolean;
  addGifs: boolean;
  addPopups: boolean;
  addRainbowText: boolean;
  bgmTrack?: string;
  soundEffects: boolean;
  customFonts?: {
    heading?: string;
    body?: string;
  };
  customColors?: {
    background?: string;
    text?: string;
    links?: string;
  };
  createdAt?: number;
}

function generateSiteHTML(config: SiteConfig): string {
  // 1. Select theme configuration
  const theme = themes[config.theme];
  
  // 2. Build CSS with theme + custom overrides
  const styles = buildStyles(theme, config.customFonts, config.customColors);
  
  // 3. Build HTML structure
  const html = buildHTML(config, theme);
  
  // 4. Build JavaScript features
  const scripts = buildScripts(config);
  
  // 5. Assemble complete document
  return assembleDocument(styles, html, scripts, config);
}
```

**Key Functions**:
- `buildStyles()`: Generate CSS from theme + customizations
- `buildHTML()`: Create HTML structure with user content
- `buildScripts()`: Add interactive features (clock, popups, etc.)
- `buildAudioElements()`: Embed BGM and sound effects
- `assembleDocument()`: Combine all parts into valid HTML5

## Data Models

### Site Configuration Model

```typescript
interface SiteConfig {
  // Identity
  name: string;                    // User's name for the site
  hobby: string;                   // User's hobby/interest
  email?: string;                  // Optional contact email
  
  // Visual Theme
  theme: 'neon' | 'space' | 'rainbow' | 'matrix' | 'geocities' | 'angelfire';
  
  // Feature Toggles
  addCursor: boolean;              // Sparkle cursor effect
  addGifs: boolean;                // Animated emoji GIFs
  addPopups: boolean;              // Welcome/exit popups
  addRainbowText: boolean;         // Rainbow gradient on name
  
  // Audio
  bgmTrack?: string;               // Background music file
  soundEffects: boolean;           // Button click sounds
  
  // Customization (Edit Mode)
  customFonts?: {
    heading?: string;              // Font family for headings
    body?: string;                 // Font family for body text
  };
  customColors?: {
    background?: string;           // Override background color
    text?: string;                 // Override text color
    links?: string;                // Override link color
  };
  
  // Metadata
  createdAt?: number;              // Unix timestamp
  updatedAt?: number;              // Unix timestamp
}
```

### Theme Model

```typescript
interface Theme {
  name: string;
  bg: string;                      // Background color
  pattern?: string;                // CSS gradient pattern
  tiledBg?: string;                // Data URL for tiled image
  textColor: string;
  headerBg: string;
  linkColor: string;
}

const themes: Record<string, Theme> = {
  neon: {
    name: 'Neon',
    bg: '#000',
    pattern: 'linear-gradient(45deg, #ff00ff 25%, transparent 25%)',
    textColor: '#0ff',
    headerBg: 'linear-gradient(90deg, #ff00ff, #00ffff)',
    linkColor: '#ff00ff'
  },
  // ... other themes
};
```

### Preset Model

```typescript
interface PresetConfig {
  id: string;
  name: string;                    // Display name
  description: string;             // Short description
  emoji: string;                   // Representative emoji
  config: SiteConfig;              // Complete site configuration
}

const presets: PresetConfig[] = [
  {
    id: 'gamer',
    name: '90s Gamer Kid',
    description: 'N64, Pokemon cards, and Mountain Dew',
    emoji: '🎮',
    config: {
      name: 'xXCoolGamer99Xx',
      hobby: 'Playing N64 and collecting Pokemon cards',
      email: 'coolgamer@hotmail.com',
      theme: 'space',
      addCursor: true,
      addGifs: true,
      addPopups: true,
      addRainbowText: true,
      bgmTrack: 'midi-game-theme',
      soundEffects: true
    }
  },
  // ... 5 more presets with varied configurations
];
```

### Guestbook Entry Model

```typescript
interface GuestbookEntry {
  _id: string;
  siteId: string;                  // Reference to site
  name: string;                    // 1-50 characters
  message: string;                 // 1-500 characters
  email?: string;                  // Optional
  website?: string;                // Optional, rendered as link
  timestamp: number;               // Unix timestamp
}
```

### User Model

```typescript
interface User {
  _id: string;
  clerkId: string;                 // Clerk user identifier
  githubUsername: string;          // From GitHub OAuth
  avatarUrl: string;               // GitHub profile picture
  createdAt: number;               // Unix timestamp
}
```

## Correctness Properties


*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Site generation incorporates all configuration

*For any* valid site configuration (name, hobby, email, theme, feature toggles, audio settings), the generated HTML should contain all specified values and include/exclude features according to the toggles.

**Validates: Requirements 1.1, 1.2, 1.3, 1.4**

**Rationale**: This comprehensive property ensures the core generation function correctly transforms any configuration into HTML. By testing with random configurations, we verify that all user inputs are respected and properly incorporated.

### Property 2: Generated HTML is valid and self-contained

*For any* site configuration, the generated HTML should be valid HTML5 markup with all styles and scripts embedded inline (no external references).

**Validates: Requirements 1.5, 1.6**

**Rationale**: This ensures generated sites are portable and work standalone. We can validate against HTML5 spec and verify no `<link>` or `<script src>` tags exist.

### Property 3: Theme application is complete

*For any* theme selection, the generated HTML should include all theme-specific properties (background color, pattern, text color, header background, link color).

**Validates: Requirements 2.2**

**Rationale**: This verifies that theme switching works correctly and all theme properties are applied. We can parse the generated CSS and verify all expected properties are present.

### Property 4: Preset loading populates all fields

*For any* template preset, loading it should populate all form fields with the preset's configuration values.

**Validates: Requirements 3.2**

**Rationale**: This ensures presets work as one-click starters. We can load each preset and verify the form state matches the preset configuration.

### Property 5: Presets demonstrate feature diversity

*For all* template presets collectively, they should use different combinations of themes, feature toggles, and audio settings with no two presets being identical.

**Validates: Requirements 3.3, 3.4**

**Rationale**: This ensures presets showcase the full range of capabilities. We can compare all preset configurations and verify sufficient variation exists.

### Property 6: Site persistence round-trip

*For any* valid site configuration and user ID, saving the site then retrieving it by the returned ID should yield an equivalent configuration with the same user association.

**Validates: Requirements 6.1, 6.2, 6.4, 6.6**

**Rationale**: This is a classic round-trip property ensuring database persistence works correctly. We verify data integrity through save/load cycles.

### Property 7: New sites initialize with zero views

*For any* newly saved site, the initial view count should be zero.

**Validates: Requirements 6.3**

**Rationale**: This ensures proper initialization of view tracking. Simple but important for correct analytics.

### Property 8: Required fields are enforced

*For any* site configuration missing required fields (name, hobby, theme), attempting to save should be rejected.

**Validates: Requirements 6.5**

**Rationale**: This validates input validation works correctly. We can test with incomplete configs and verify they're rejected.

### Property 9: View count increments correctly

*For any* site, viewing it N times should result in the view count increasing by N.

**Validates: Requirements 9.1, 9.2**

**Rationale**: This ensures view tracking is accurate. We can view a site multiple times and verify the count matches.

### Property 10: Guestbook validation enforces length limits

*For any* guestbook submission, names outside 1-50 characters or messages outside 1-500 characters should be rejected, while those within limits should be accepted.

**Validates: Requirements 10.5, 10.6**

**Rationale**: This validates input sanitization for guestbook entries. We can generate strings of various lengths and verify correct acceptance/rejection.

### Property 11: Guestbook entries persist completely

*For any* valid guestbook entry (site ID, name, message, optional email/website), submitting it should store all fields and make them retrievable.

**Validates: Requirements 10.4**

**Rationale**: This ensures guestbook data integrity. We can submit entries and verify all fields are stored correctly.

### Property 12: Downloaded sites are self-contained

*For any* site configuration, downloading the site should produce HTML that displays all features correctly when opened standalone (outside the application).

**Validates: Requirements 11.1, 11.4**

**Rationale**: This ensures downloads work independently. We can generate, download, and verify the HTML works without the application context.

### Property 13: Iframe context suppresses popups

*For any* site configuration with popups enabled, rendering in an iframe should not trigger popup alerts, while rendering standalone should trigger them.

**Validates: Requirements 12.3**

**Rationale**: This ensures the iframe detection logic works correctly. We can test in both contexts and verify different behavior.

### Property 14: Form validation rejects invalid inputs

*For any* form submission with empty name, empty hobby, or missing theme, the validation should reject it and display an error.

**Validates: Requirements 16.1, 16.2, 16.3**

**Rationale**: This validates basic form validation. These are edge cases that should always be caught.

### Property 15: Email validation requires @ symbol

*For any* email input, those containing @ should pass validation while those without @ should fail.

**Validates: Requirements 16.4**

**Rationale**: This ensures basic email validation works. We can test with various strings and verify correct validation.

### Property 16: Edit preserves metadata

*For any* site, editing and saving changes should update the configuration while preserving the original creation timestamp and view count.

**Validates: Requirements 19.9, 19.10**

**Rationale**: This ensures edits don't corrupt metadata. We can edit a site and verify createdAt and views remain unchanged.

## Error Handling

### Client-Side Error Handling

**Form Validation Errors**:
- Display inline error messages below invalid fields
- Prevent form submission until all errors are resolved
- Use red text and border styling for visual feedback
- Clear errors when user corrects the input

**Network Errors**:
- Display toast notifications for failed API calls
- Provide retry buttons for transient failures
- Show loading states during async operations
- Handle offline scenarios gracefully

**Authentication Errors**:
- Redirect to sign-in page when session expires
- Display clear messages when auth is required
- Preserve user work when prompting for sign-in
- Handle OAuth callback errors

### Server-Side Error Handling

**Database Errors**:
- Log errors with context for debugging
- Return user-friendly error messages
- Implement retry logic for transient failures
- Validate data before database operations

**Validation Errors**:
- Return 400 Bad Request with specific error details
- Validate all inputs at the mutation level
- Sanitize user inputs to prevent injection
- Enforce length limits and required fields

**Authorization Errors**:
- Return 401 Unauthorized for missing auth
- Return 403 Forbidden for insufficient permissions
- Verify user owns resources before modifications
- Check authentication on all protected operations

### Error Recovery Strategies

**Optimistic Updates**:
- Update UI immediately for better UX
- Roll back on server error
- Show error toast and restore previous state
- Retry failed mutations automatically (max 3 attempts)

**Graceful Degradation**:
- Show cached data when real-time updates fail
- Allow preview generation even if save fails
- Enable download even without authentication
- Provide fallback UI for missing data

**Error Boundaries**:
- Catch React errors at component boundaries
- Display friendly error pages
- Provide "Go Home" and "Retry" actions
- Log errors to monitoring service

## Testing Strategy

### Unit Testing

**Purpose**: Verify individual functions and components work correctly in isolation.

**Scope**:
- Site generator functions (HTML generation, CSS building, script assembly)
- Theme configuration logic
- Preset data structures
- Validation functions
- Utility functions (date formatting, string sanitization)

**Tools**: Vitest, React Testing Library

**Example Tests**:
```typescript
describe('generateSiteHTML', () => {
  it('includes user name in title and heading', () => {
    const config = { name: 'Test User', hobby: 'Testing', theme: 'neon', ... };
    const html = generateSiteHTML(config);
    expect(html).toContain('<title>Test User');
    expect(html).toContain('Test User\'s Homepage');
  });
  
  it('excludes popups when addPopups is false', () => {
    const config = { ..., addPopups: false };
    const html = generateSiteHTML(config);
    expect(html).not.toContain('alert(');
  });
});
```

### Property-Based Testing

**Purpose**: Verify universal properties hold across all possible inputs using randomized testing.

**Library**: fast-check (JavaScript property-based testing library)

**Configuration**: Each property test should run a minimum of 100 iterations with randomly generated inputs.

**Tagging Convention**: Each property-based test MUST include a comment tag in this exact format:
```typescript
// **Feature: 90s-website-generator, Property 1: Site generation incorporates all configuration**
```

**Property Test Examples**:

```typescript
import fc from 'fast-check';

// **Feature: 90s-website-generator, Property 1: Site generation incorporates all configuration**
test('Property 1: Site generation incorporates all configuration', () => {
  fc.assert(
    fc.property(
      fc.record({
        name: fc.string({ minLength: 1, maxLength: 50 }),
        hobby: fc.string({ minLength: 1, maxLength: 100 }),
        email: fc.option(fc.emailAddress()),
        theme: fc.constantFrom('neon', 'space', 'rainbow', 'matrix', 'geocities', 'angelfire'),
        addCursor: fc.boolean(),
        addGifs: fc.boolean(),
        addPopups: fc.boolean(),
        addRainbowText: fc.boolean(),
        bgmTrack: fc.option(fc.constantFrom('midi-1', 'midi-2', 'midi-3')),
        soundEffects: fc.boolean()
      }),
      (config) => {
        const html = generateSiteHTML(config);
        
        // Verify name appears in HTML
        expect(html).toContain(config.name);
        
        // Verify hobby appears in HTML
        expect(html).toContain(config.hobby);
        
        // Verify theme is applied
        const theme = themes[config.theme];
        expect(html).toContain(theme.bg);
        
        // Verify feature toggles
        if (config.addCursor) {
          expect(html).toContain('cursor:');
        }
        if (config.addGifs) {
          expect(html).toContain('spinning');
        }
        if (config.addPopups) {
          expect(html).toContain('alert(');
        }
        if (config.addRainbowText) {
          expect(html).toContain('rainbow-text');
        }
      }
    ),
    { numRuns: 100 }
  );
});

// **Feature: 90s-website-generator, Property 6: Site persistence round-trip**
test('Property 6: Site persistence round-trip', async () => {
  fc.assert(
    fc.asyncProperty(
      fc.record({
        userId: fc.uuid(),
        name: fc.string({ minLength: 1, maxLength: 50 }),
        hobby: fc.string({ minLength: 1, maxLength: 100 }),
        theme: fc.constantFrom('neon', 'space', 'rainbow', 'matrix', 'geocities', 'angelfire'),
        // ... other fields
      }),
      async (config) => {
        // Save site
        const siteId = await saveSite({ userId: config.userId, config });
        
        // Retrieve site
        const retrieved = await getSite({ siteId });
        
        // Verify all fields match
        expect(retrieved.name).toBe(config.name);
        expect(retrieved.hobby).toBe(config.hobby);
        expect(retrieved.theme).toBe(config.theme);
        expect(retrieved.userId).toBe(config.userId);
        // ... verify other fields
      }
    ),
    { numRuns: 100 }
  );
});

// **Feature: 90s-website-generator, Property 10: Guestbook validation enforces length limits**
test('Property 10: Guestbook validation enforces length limits', () => {
  fc.assert(
    fc.property(
      fc.record({
        siteId: fc.uuid(),
        name: fc.string(),
        message: fc.string()
      }),
      (entry) => {
        const nameValid = entry.name.length >= 1 && entry.name.length <= 50;
        const messageValid = entry.message.length >= 1 && entry.message.length <= 500;
        const shouldAccept = nameValid && messageValid;
        
        if (shouldAccept) {
          expect(() => validateGuestbookEntry(entry)).not.toThrow();
        } else {
          expect(() => validateGuestbookEntry(entry)).toThrow();
        }
      }
    ),
    { numRuns: 100 }
  );
});
```

### Integration Testing

**Purpose**: Verify components work together correctly.

**Scope**:
- Form submission → preview update flow
- Save → gallery display flow
- Site page → guestbook interaction
- Authentication → protected routes
- Preset loading → form population

**Tools**: Playwright or Cypress for E2E tests

**Example Tests**:
- Load preset → verify form fields → verify preview updates
- Fill form → save site → verify appears in gallery
- View site → sign guestbook → verify entry appears
- Guest mode → attempt save → verify sign-in prompt

### Testing Approach

**Test-Driven Development Flow**:
1. Implement feature or fix
2. Write unit tests for specific behaviors
3. Write property tests for universal properties
4. Run all tests to verify correctness
5. Fix any failures before moving to next feature

**Coverage Goals**:
- Unit tests: 80%+ code coverage
- Property tests: All correctness properties from design doc
- Integration tests: Critical user flows

**Continuous Integration**:
- Run all tests on every commit
- Block merges if tests fail
- Run property tests with 100 iterations in CI
- Monitor test execution time

## Implementation Notes

### Technology Choices

**Why Next.js 16 App Router?**
- Server components for better performance
- Built-in routing and layouts
- Excellent TypeScript support
- Vercel deployment optimization

**Why Convex?**
- Real-time reactive queries (perfect for guestbook)
- Automatic caching and optimistic updates
- TypeScript-first with generated types
- Serverless scaling

**Why Clerk?**
- Drop-in authentication components
- GitHub OAuth in minutes
- Seamless Convex integration
- Free tier sufficient for project

**Why Zustand?**
- Minimal boilerplate
- No provider wrapping needed
- Excellent TypeScript support
- Perfect for form state

**Why fast-check?**
- Mature property-based testing library
- Excellent TypeScript support
- Shrinking for minimal failing examples
- Configurable generators

### Performance Considerations

**Site Generation**:
- Memoize theme configurations
- Cache generated HTML for identical configs
- Debounce preview updates (500ms)
- Use Web Workers for heavy generation (future)

**Database Queries**:
- Index by userId for gallery queries
- Index by siteId for guestbook queries
- Limit gallery results (pagination)
- Use Convex's automatic caching

**Asset Delivery**:
- Inline small assets (badges as data URLs)
- Lazy load guestbook entries
- Use Vercel's automatic image optimization
- Leverage edge caching for static assets

### Security Considerations

**Input Sanitization**:
- Escape HTML in user inputs
- Validate all lengths and formats
- Sanitize guestbook entries
- Prevent XSS in generated sites

**Authentication**:
- Verify user owns resources before edits
- Check auth on all protected mutations
- Use Clerk's session management
- Implement CSRF protection

**Rate Limiting**:
- Limit guestbook submissions per IP
- Throttle site generation requests
- Implement Convex rate limiting
- Monitor for abuse patterns

### Accessibility

**WCAG 2.1 AA Compliance**:
- Semantic HTML in generator interface
- Keyboard navigation support
- ARIA labels on interactive elements
- Sufficient color contrast ratios
- Focus indicators on all interactive elements

**Generated Sites**:
- Note: 90s sites were not accessible
- Provide alt text for badge images
- Ensure keyboard navigation works
- Add skip links for screen readers
- Consider "accessible mode" toggle (future)

### Deployment Strategy

**Vercel Deployment**:
1. Connect GitHub repository
2. Configure environment variables (Clerk, Convex)
3. Set build command: `npm run build`
4. Set output directory: `.next`
5. Enable automatic deployments on push

**Convex Deployment**:
1. Run `npx convex dev` for development
2. Run `npx convex deploy` for production
3. Configure production environment variables
4. Set up Clerk webhook for user sync

**Environment Variables**:
```
NEXT_PUBLIC_CONVEX_URL=<convex-url>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<clerk-key>
CLERK_SECRET_KEY=<clerk-secret>
```

**Monitoring**:
- Vercel Analytics for performance
- Convex dashboard for database metrics
- Error tracking with Sentry (optional)
- User analytics with Plausible (optional)

### Future Enhancements

**Phase 1 Additions**:
- More themes (Tripod, Xoom, Fortune City)
- More presets (Anime Fan, Band Page, Personal Blog)
- Custom CSS editor for advanced users
- Image upload for backgrounds

**Phase 2 Additions**:
- Visual editor (drag-and-drop)
- Site templates marketplace
- Custom domain support
- Site analytics dashboard

**Phase 3 Additions**:
- Collaboration features (shared editing)
- Site versioning and history
- Export to different formats (PDF, PNG)
- AI-powered content suggestions
