---
inclusion: always
---

# Coding Standards - 90s Website Generator

## TypeScript Standards

### Type Safety
- **Always use explicit types** for function parameters and return values
- **Avoid `any`** - use `unknown` if type is truly unknown
- **Use interfaces** for object shapes, especially for configs
- **Export types** that are used across files

```typescript
// ✅ Good
export interface SiteConfig {
  name: string;
  hobby: string;
  theme: string;
}

function generateSite(config: SiteConfig): string {
  // ...
}

// ❌ Bad
function generateSite(config: any) {
  // ...
}
```

### Naming Conventions
- **Components**: PascalCase (`GeneratorForm`, `Header`)
- **Files**: kebab-case for utilities (`site-generator.ts`), PascalCase for components (`Header.tsx`)
- **Functions**: camelCase (`generateSiteHTML`, `updateConfig`)
- **Constants**: UPPER_SNAKE_CASE for true constants (`MAX_NAME_LENGTH`)
- **Interfaces**: PascalCase with descriptive names (`SiteConfig`, `GuestbookEntry`)

## React/Next.js Standards

### Component Structure
```typescript
// 1. Imports
import { useState } from 'react';
import { useGeneratorStore } from '@/lib/store';

// 2. Types/Interfaces
interface Props {
  initialValue?: string;
}

// 3. Component
export function MyComponent({ initialValue }: Props) {
  // 4. Hooks
  const [value, setValue] = useState(initialValue);
  const { config } = useGeneratorStore();
  
  // 5. Event handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  
  // 6. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Client vs Server Components
- **Default to Server Components** (no "use client")
- **Use "use client"** only when needed:
  - Using hooks (useState, useEffect, etc.)
  - Event handlers
  - Browser APIs
  - Zustand store

```typescript
// Server Component (default)
export default function Page() {
  return <div>Static content</div>;
}

// Client Component (when needed)
"use client";
export function InteractiveForm() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}
```

## Convex Standards

### Schema Definition
- **Use descriptive field names**
- **Add comments** for complex fields
- **Create indexes** for frequently queried fields
- **Use optional fields** with `v.optional()` when appropriate

```typescript
sites: defineTable({
  // User association
  userId: v.string(), // Clerk user ID
  
  // Basic info
  name: v.string(),
  hobby: v.string(),
  
  // Metadata
  createdAt: v.number(),
  views: v.number(),
})
  .index("by_user", ["userId"])
  .index("by_user_created", ["userId", "createdAt"]),
```

### Queries and Mutations
- **Queries**: Read-only, reactive
- **Mutations**: Write operations
- **Validate inputs** in mutations
- **Return meaningful data** from mutations

```typescript
// Query
export const getSite = query({
  args: { siteId: v.id("sites") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.siteId);
  }
});

// Mutation with validation
export const saveSite = mutation({
  args: { 
    userId: v.string(),
    name: v.string(),
    hobby: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate
    if (args.name.length === 0) {
      throw new Error("Name is required");
    }
    
    // Save
    const siteId = await ctx.db.insert("sites", {
      ...args,
      createdAt: Date.now(),
      views: 0,
    });
    
    return siteId;
  }
});
```

## Testing Standards

### Property-Based Tests
- **Use fast-check** for property tests
- **Run 100 iterations minimum** (`{ numRuns: 100 }`)
- **Tag each test** with format: `**Feature: 90s-website-generator, Property N: [text]**`
- **Test universal properties**, not specific examples

```typescript
// **Feature: 90s-website-generator, Property 1: Site generation incorporates all configuration**
it('Property 1: Site generation incorporates all configuration', () => {
  fc.assert(
    fc.property(
      fc.record({
        name: fc.string({ minLength: 1, maxLength: 50 }),
        hobby: fc.string({ minLength: 1, maxLength: 100 }),
        theme: fc.constantFrom('neon', 'space', 'rainbow', 'matrix', 'geocities', 'angelfire'),
      }),
      (config) => {
        const html = generateSiteHTML(config);
        expect(html).toContain(config.name);
        expect(html).toContain(config.hobby);
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Tests
- **Test specific behaviors**
- **Use descriptive test names**
- **Arrange-Act-Assert pattern**

```typescript
describe('generateSiteHTML', () => {
  it('includes user name in title and heading', () => {
    // Arrange
    const config = { name: 'Test User', hobby: 'Testing', theme: 'neon' };
    
    // Act
    const html = generateSiteHTML(config);
    
    // Assert
    expect(html).toContain('<title>Test User');
    expect(html).toContain('Test User\'s Homepage');
  });
});
```

## File Organization

### Import Order
1. External libraries (React, Next.js, etc.)
2. Internal components
3. Internal utilities
4. Types
5. Styles

```typescript
// 1. External
import { useState } from 'react';
import Link from 'next/link';

// 2. Components
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';

// 3. Utilities
import { generateSiteHTML } from '@/lib/site-generator';
import { useGeneratorStore } from '@/lib/store';

// 4. Types
import type { SiteConfig } from '@/lib/store';
```

## Error Handling

### Client-Side
- **Use try-catch** for async operations
- **Show user-friendly messages**
- **Log errors** for debugging

```typescript
try {
  await saveSite(config);
  toast.success('Site saved!');
} catch (error) {
  console.error('Failed to save site:', error);
  toast.error('Failed to save site. Please try again.');
}
```

### Server-Side (Convex)
- **Validate inputs** before processing
- **Throw descriptive errors**
- **Return error details** when appropriate

```typescript
export const saveSite = mutation({
  handler: async (ctx, args) => {
    if (!args.name || args.name.length === 0) {
      throw new Error("Name is required");
    }
    if (args.name.length > 50) {
      throw new Error("Name must be 50 characters or less");
    }
    // ... save logic
  }
});
```

## Performance

### Optimization Guidelines
- **Debounce** expensive operations (preview updates)
- **Memoize** computed values with `useMemo`
- **Lazy load** heavy components
- **Use Server Components** when possible (faster initial load)

```typescript
// Debounce preview updates
const updatePreview = useDebouncedPreview(generateSiteHTML, 500);

// Memoize expensive computations
const processedData = useMemo(() => {
  return expensiveOperation(data);
}, [data]);
```

## Accessibility

- **Use semantic HTML** (`<button>`, `<nav>`, `<main>`)
- **Add ARIA labels** for screen readers
- **Ensure keyboard navigation** works
- **Maintain color contrast** (WCAG AA minimum)

```typescript
<button
  onClick={handleClick}
  aria-label="Save site"
  className="px-4 py-2 bg-purple-600 text-white"
>
  Save
</button>
```

## Git Workflow & Commit Messages

### ⚠️ CRITICAL RULE: Never Push to Main

**ALL changes MUST go through Pull Requests. NO EXCEPTIONS.**

```bash
# ❌ FORBIDDEN - NEVER DO THIS
git checkout main
git push origin main

# ✅ REQUIRED - ALWAYS DO THIS
git checkout -b fix/description
git add .
git commit -m "fix: description"
git push origin fix/description
gh pr create --title "Fix: Description" --body "Details"
```

**Why this rule exists:**
- Ensures CI/CD checks pass before deployment
- Prevents breaking production
- Allows code review
- Maintains clean deployment history

### Commit Message Format

Format: `<type>: <description>`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `test`: Add/update tests
- `refactor`: Code refactoring
- `docs`: Documentation
- `style`: Formatting, no code change
- `chore`: Maintenance tasks

Examples:
- `feat: add audio support to site generator`
- `fix: resolve iframe popup issue`
- `test: add property test for audio generation`
- `refactor: extract audio generation to separate functions`
