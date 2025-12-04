---
inclusion: always
---

# Project Structure - 90s Website Generator

## ⚠️ CRITICAL: vibe_coding/ Directory is FROZEN

**NEVER modify anything in `vibe_coding/` directory!**

- `vibe_coding/version1/` - Frozen vanilla JS baseline (reference only)
- `vibe_coding/version2/` - Frozen Next.js reference (reference only)
- **All active development happens at the project root**

## Directory Layout

```
├── vibe_coding/                 # ⚠️ FROZEN - DO NOT MODIFY ⚠️
│   ├── version1/               # Frozen baseline (vanilla JS reference)
│   │   ├── index.html          # Original vanilla JS implementation
│   │   ├── style.css
│   │   ├── generator.js
│   │   └── README.md
│   └── version2/               # Frozen reference (Next.js reference)
│       ├── app/                # Reference Next.js structure
│       ├── components/         # Reference components
│       └── ...                 # Reference implementation
│
├── app/                         # ✅ ACTIVE DEVELOPMENT - Next.js App Router
    │   ├── layout.tsx          # Root layout with Clerk + Convex
    │   ├── page.tsx            # Home page (generator)
    │   ├── providers.tsx       # Convex provider
    │   ├── globals.css         # Global styles
    │   ├── gallery/            # Private gallery (auth required)
    │   │   └── page.tsx
    │   ├── site/[id]/          # Individual site pages (public)
    │   │   └── page.tsx
    │   ├── sign-in/            # Clerk sign-in
    │   │   └── [[...sign-in]]/
    │   │       └── page.tsx
    │   └── sign-up/            # Clerk sign-up
    │       └── [[...sign-up]]/
    │           └── page.tsx
    │
    ├── components/              # React components
    │   ├── Header.tsx          # Navigation with auth
    │   ├── generator/          # Site generator components
    │   │   └── GeneratorForm.tsx
    │   ├── guestbook/          # Guestbook components
    │   │   └── GuestbookWidget.tsx
    │   └── ui/                 # shadcn/ui components
    │       ├── button.tsx
    │       ├── input.tsx
    │       └── ...
    │
    ├── lib/                     # Utilities and business logic
    │   ├── site-generator.ts   # HTML generation logic
    │   ├── store.ts            # Zustand state management
    │   ├── themes.ts           # Theme configurations
    │   ├── presets.ts          # Template presets
    │   ├── utils.ts            # Utility functions
    │   └── __tests__/          # Test files
    │       └── site-generator.test.ts
    │
    ├── convex/                  # Convex backend
    │   ├── schema.ts           # Database schema
    │   ├── sites.ts            # Site queries/mutations
    │   ├── guestbook.ts        # Guestbook queries/mutations
    │   ├── _generated/         # Auto-generated types
    │   └── tsconfig.json
    │
    ├── public/                  # Static assets
    │   └── ...
    │
    ├── middleware.ts            # Clerk auth middleware
    ├── vitest.config.ts        # Test configuration
    ├── next.config.ts          # Next.js configuration
    ├── tailwind.config.ts      # Tailwind configuration
    ├── tsconfig.json           # TypeScript configuration
    ├── package.json            # Dependencies and scripts
    ├── .env.local              # Environment variables (not in git)
    ├── CLERK_SETUP.md          # Clerk setup instructions
    └── DEPLOYMENT.md           # Deployment guide
```

## Module Architecture

### Frontend Layers

```
┌─────────────────────────────────────────┐
│           Pages (app/)                   │
│  - Route definitions                     │
│  - Server Components by default          │
│  - Client Components when needed         │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│        Components (components/)          │
│  - Reusable UI components                │
│  - Business logic components             │
│  - shadcn/ui primitives                  │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         State (lib/store.ts)             │
│  - Zustand store                         │
│  - Form state                            │
│  - UI state                              │
│  - Edit mode state                       │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│      Business Logic (lib/)               │
│  - Site generation                       │
│  - Theme management                      │
│  - Preset configurations                 │
│  - Utility functions                     │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Backend (convex/)                │
│  - Database schema                       │
│  - Queries (read)                        │
│  - Mutations (write)                     │
│  - Real-time subscriptions               │
└──────────────────────────────────────────┘
```

### Data Flow

```
User Input
    ↓
Form Component (Client)
    ↓
Zustand Store (Client State)
    ↓
Site Generator (Business Logic)
    ↓
Preview Component (Display)

User Saves
    ↓
Convex Mutation (Server)
    ↓
Database (Convex)
    ↓
Convex Query (Reactive)
    ↓
Gallery Component (Display)
```

## Naming Conventions

### Files

```
Components:
  Header.tsx              # PascalCase for components
  GeneratorForm.tsx
  GuestbookWidget.tsx

Utilities:
  site-generator.ts       # kebab-case for utilities
  store.ts
  themes.ts

Tests:
  site-generator.test.ts  # .test.ts suffix
  store.test.ts

Pages:
  page.tsx                # Next.js convention
  layout.tsx
  [id]/page.tsx           # Dynamic routes
```

### Code

```typescript
// Components: PascalCase
export function GeneratorForm() { }

// Functions: camelCase
function generateSiteHTML() { }
function updateConfig() { }

// Constants: UPPER_SNAKE_CASE
const MAX_NAME_LENGTH = 50;
const DEFAULT_THEME = 'neon';

// Interfaces: PascalCase
interface SiteConfig { }
interface GuestbookEntry { }

// Types: PascalCase
type Theme = 'neon' | 'space';
type AudioTrack = string;

// Variables: camelCase
const userName = 'John';
const siteConfig = { };
```

## Component Organization

### Component File Structure

```typescript
// 1. Imports (external first, then internal)
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { generateSiteHTML } from '@/lib/site-generator';
import type { SiteConfig } from '@/lib/store';

// 2. Types/Interfaces
interface GeneratorFormProps {
  initialConfig?: SiteConfig;
  onSave?: (config: SiteConfig) => void;
}

// 3. Component
export function GeneratorForm({ initialConfig, onSave }: GeneratorFormProps) {
  // 4. Hooks (state, effects, custom hooks)
  const [config, setConfig] = useState(initialConfig);
  const { updateConfig } = useGeneratorStore();
  
  // 5. Event handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(config);
  };
  
  // 6. Helper functions (if needed)
  const validateConfig = () => {
    return config.name.length > 0;
  };
  
  // 7. Render
  return (
    <form onSubmit={handleSubmit}>
      {/* JSX */}
    </form>
  );
}
```

### Component Patterns

**Server Component (default)**
```typescript
// No "use client" directive
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

**Client Component (when needed)**
```typescript
"use client";

export function InteractiveForm() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}
```

**Compound Components**
```typescript
export function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}

Card.Header = function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="card-header">{children}</div>;
};

Card.Body = function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="card-body">{children}</div>;
};

// Usage:
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

## State Management

### Zustand Store Structure

```typescript
// lib/store.ts
interface State {
  // Data
  config: SiteConfig;
  previewHtml: string;
  
  // UI State
  isEditMode: boolean;
  isGenerating: boolean;
  
  // Actions
  updateConfig: (updates: Partial<SiteConfig>) => void;
  setPreviewHtml: (html: string) => void;
  enterEditMode: (siteId: string, config: SiteConfig) => void;
  exitEditMode: () => void;
}

export const useGeneratorStore = create<State>((set) => ({
  // Initial state
  config: defaultConfig,
  previewHtml: '',
  isEditMode: false,
  isGenerating: false,
  
  // Actions
  updateConfig: (updates) =>
    set((state) => ({
      config: { ...state.config, ...updates },
    })),
  // ... other actions
}));
```

### Convex Schema Structure

```typescript
// convex/schema.ts
export default defineSchema({
  sites: defineTable({
    // User association
    userId: v.string(),
    
    // Content
    name: v.string(),
    hobby: v.string(),
    
    // Configuration
    theme: v.string(),
    addCursor: v.boolean(),
    
    // Metadata
    createdAt: v.number(),
    views: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_created", ["userId", "createdAt"]),
});
```

## Testing Organization

### Test File Structure

```typescript
// lib/__tests__/site-generator.test.ts
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { generateSiteHTML } from '../site-generator';

describe('Site Generator', () => {
  // Property-Based Tests
  describe('Property-Based Tests', () => {
    // **Feature: 90s-website-generator, Property 1: Description**
    it('Property 1: Description', () => {
      fc.assert(
        fc.property(
          // generators
          (input) => {
            // test
          }
        ),
        { numRuns: 100 }
      );
    });
  });
  
  // Unit Tests
  describe('Unit Tests', () => {
    describe('HTML generation', () => {
      it('includes user name in title', () => {
        // test
      });
    });
  });
});
```

### Test Organization Rules

1. **Co-locate tests** with source files in `__tests__/` directory
2. **Name test files** with `.test.ts` suffix
3. **Group by feature** using `describe` blocks
4. **Property tests first**, then unit tests
5. **Tag property tests** with required format

## Import Aliases

```typescript
// Use @ alias for imports
import { Header } from '@/components/Header';
import { generateSiteHTML } from '@/lib/site-generator';
import { useGeneratorStore } from '@/lib/store';

// Configured in tsconfig.json:
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Configuration Files

### Key Configuration Files

```
next.config.ts          # Next.js configuration
tailwind.config.ts      # Tailwind CSS configuration
tsconfig.json           # TypeScript configuration
vitest.config.ts        # Test configuration
eslint.config.mjs       # ESLint configuration
.env.local              # Environment variables (gitignored)
```

### Environment Variables

```bash
# .env.local (development)
CONVEX_DEPLOYMENT=dev:your-deployment
NEXT_PUBLIC_CONVEX_URL=https://your-dev.convex.cloud
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## Module Dependencies

### Dependency Rules

1. **Pages** can import from **Components**, **Lib**, **Convex**
2. **Components** can import from **Lib**, **UI Components**
3. **Lib** should be self-contained (no component imports)
4. **Convex** should be self-contained (no frontend imports)

### Circular Dependency Prevention

```typescript
// ❌ Bad: Circular dependency
// lib/store.ts imports from lib/site-generator.ts
// lib/site-generator.ts imports from lib/store.ts

// ✅ Good: One-way dependency
// lib/store.ts imports from lib/site-generator.ts
// lib/site-generator.ts has no store dependency
```

## Special Directories

### `_generated/` (Convex)
- Auto-generated by Convex
- Never edit manually
- Gitignored
- Contains TypeScript types for queries/mutations

### `__tests__/`
- Contains test files
- Co-located with source files
- Named with `.test.ts` suffix

### `ui/` (shadcn/ui)
- Pre-built accessible components
- Can be customized
- Generated by shadcn CLI

## Version Control

### Git Ignore Patterns

```
# Dependencies
node_modules/

# Build output
.next/
dist/

# Environment
.env.local
.env.production

# Convex
convex/_generated/

# Testing
coverage/

# IDE
.vscode/
.idea/

# OS
.DS_Store
```

### Branch Naming

```
feat/feature-name       # New features
fix/bug-description     # Bug fixes
test/test-description   # Test additions
refactor/description    # Code refactoring
docs/description        # Documentation
chore/description       # Maintenance
```

## Documentation

### Inline Documentation

```typescript
/**
 * Generates a complete HTML website from site configuration.
 * 
 * @param config - Site configuration including name, hobby, theme, etc.
 * @returns Complete HTML string with inline styles and scripts
 * 
 * @example
 * ```typescript
 * const html = generateSiteHTML({
 *   name: 'John',
 *   hobby: 'Coding',
 *   theme: 'neon'
 * });
 * ```
 */
export function generateSiteHTML(config: SiteConfig): string {
  // Implementation
}
```

### README Files

- **Root README**: Project overview
- **Component README**: Complex component usage
- **Setup README**: Configuration instructions (CLERK_SETUP.md, DEPLOYMENT.md)

## Best Practices

1. **Keep components small** - Single responsibility
2. **Co-locate related files** - Tests with source
3. **Use absolute imports** - `@/` alias
4. **Avoid deep nesting** - Max 3-4 levels
5. **Group by feature** - Not by file type
6. **Document complex logic** - Inline comments
7. **Test at appropriate level** - Property tests for logic, unit tests for specifics
