---
inclusion: always
---

# Technical Stack - 90s Website Generator

## Tech Stack

### Frontend
- **Next.js 16** - App Router, React Server Components
- **React 19** - Latest features and performance
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Pre-built accessible components
- **Zustand** - Lightweight state management

### Backend
- **Convex** - Real-time database with reactive queries
- **Clerk** - Authentication (GitHub OAuth)

### Testing
- **Vitest** - Fast unit test runner
- **fast-check** - Property-based testing library
- **@vitest/ui** - Visual test interface

### Deployment
- **Vercel** - Frontend hosting + CDN
- **Convex Cloud** - Database hosting
- **GitHub** - Version control + CI/CD

## Build System

### Development
```bash
# Start Convex dev server (Terminal 1)
npx convex dev

# Start Next.js dev server (Terminal 2)
npm run dev

# Open http://localhost:3000
```

### Testing
```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run specific test file
npm test site-generator.test.ts
```

### Building
```bash
# Build for production
npm run build

# Start production server locally
npm start

# Deploy Convex
npx convex deploy --prod
```

### Linting
```bash
# Run ESLint
npm run lint

# Auto-fix issues
npm run lint -- --fix
```

## Common Commands

### Package Management
```bash
# Install dependencies
npm install

# Add new package
npm install <package-name>

# Add dev dependency
npm install --save-dev <package-name>

# Update packages
npm update
```

### Database (Convex)
```bash
# Deploy schema changes
npx convex deploy

# View dashboard
npx convex dashboard

# Clear all data (dev only)
npx convex data clear

# Import data
npx convex import --table sites data.jsonl
```

### Git Workflow
```bash
# Create feature branch
git checkout -b feat/feature-name

# Commit with conventional format
git commit -m "feat: add feature description"

# Push and create PR
git push origin feat/feature-name
```

## Code Style Conventions

### TypeScript

**Type Annotations**
```typescript
// ✅ Always annotate function parameters and return types
function generateSite(config: SiteConfig): string {
  return html;
}

// ❌ Don't rely on inference for public APIs
function generateSite(config) {
  return html;
}
```

**Interfaces vs Types**
```typescript
// ✅ Use interfaces for object shapes
export interface SiteConfig {
  name: string;
  hobby: string;
}

// ✅ Use types for unions and complex types
export type Theme = 'neon' | 'space' | 'rainbow';
```

**Avoid `any`**
```typescript
// ✅ Use specific types
function process(data: SiteConfig): void { }

// ❌ Don't use any
function process(data: any): void { }

// ✅ Use unknown if type is truly unknown
function process(data: unknown): void {
  if (typeof data === 'object') { }
}
```

### React/Next.js

**Component Structure**
```typescript
// 1. Imports (external, then internal)
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// 2. Types
interface Props {
  title: string;
}

// 3. Component
export function MyComponent({ title }: Props) {
  // 4. Hooks
  const [value, setValue] = useState('');
  
  // 5. Handlers
  const handleClick = () => {
    setValue('clicked');
  };
  
  // 6. Render
  return <Button onClick={handleClick}>{title}</Button>;
}
```

**Server vs Client Components**
```typescript
// Server Component (default - no "use client")
export default function Page() {
  return <div>Static content</div>;
}

// Client Component (only when needed)
"use client";
export function InteractiveForm() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}
```

### Naming Conventions

```typescript
// Components: PascalCase
export function GeneratorForm() { }

// Files: kebab-case for utils, PascalCase for components
// site-generator.ts
// GeneratorForm.tsx

// Functions: camelCase
function generateSiteHTML() { }

// Constants: UPPER_SNAKE_CASE
const MAX_NAME_LENGTH = 50;

// Interfaces: PascalCase
interface SiteConfig { }

// Variables: camelCase
const userName = 'John';
```

### Import Organization

```typescript
// 1. External libraries
import { useState } from 'react';
import Link from 'next/link';

// 2. Internal components
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';

// 3. Internal utilities
import { generateSiteHTML } from '@/lib/site-generator';
import { useGeneratorStore } from '@/lib/store';

// 4. Types
import type { SiteConfig } from '@/lib/store';

// 5. Styles (if any)
import './styles.css';
```

## Testing Framework

### Property-Based Tests (fast-check)

**Required Format**
```typescript
// **Feature: 90s-website-generator, Property N: Description**
it('Property N: Description', () => {
  fc.assert(
    fc.property(
      // Generators
      fc.record({
        name: fc.string({ minLength: 1, maxLength: 50 }),
        hobby: fc.string({ minLength: 1, maxLength: 100 }),
      }),
      // Test function
      (config) => {
        const result = functionUnderTest(config);
        expect(result).toContain(config.name);
      }
    ),
    { numRuns: 100 } // REQUIRED: 100 iterations minimum
  );
});
```

**Common Generators**
```typescript
// Strings
fc.string({ minLength: 1, maxLength: 50 })
fc.emailAddress()

// Numbers
fc.integer({ min: 0, max: 100 })
fc.nat()

// Booleans
fc.boolean()

// Constants
fc.constantFrom('neon', 'space', 'rainbow')

// Objects
fc.record({
  name: fc.string(),
  age: fc.integer(),
})

// Optional values
fc.option(fc.string())

// Arrays
fc.array(fc.string(), { minLength: 1, maxLength: 10 })
```

### Unit Tests (Vitest)

**Structure**
```typescript
describe('Module Name', () => {
  describe('specific behavior', () => {
    it('should do something specific', () => {
      // Arrange
      const input = setupTestData();
      
      // Act
      const result = functionUnderTest(input);
      
      // Assert
      expect(result).toBe(expectedValue);
    });
  });
});
```

## Performance Optimization

### Debouncing
```typescript
// Debounce expensive operations
const updatePreview = useDebouncedPreview(generateSiteHTML, 500);
```

### Memoization
```typescript
// Memoize computed values
const processedData = useMemo(() => {
  return expensiveOperation(data);
}, [data]);
```

### Server Components
```typescript
// Use Server Components by default (faster initial load)
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

## Error Handling

### Client-Side
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
```typescript
export const saveSite = mutation({
  handler: async (ctx, args) => {
    // Validate
    if (!args.name || args.name.length === 0) {
      throw new Error("Name is required");
    }
    
    // Process
    const siteId = await ctx.db.insert("sites", args);
    return siteId;
  }
});
```

## Environment Variables

### Development (.env.local)
```bash
# Convex
CONVEX_DEPLOYMENT=dev:your-dev-deployment
NEXT_PUBLIC_CONVEX_URL=https://your-dev.convex.cloud

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### Production (Vercel)
```bash
# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-prod.convex.cloud

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
```

## Debugging

### Next.js
```typescript
// Add console logs
console.log('Debug:', value);

// Use React DevTools
// Install: https://react.dev/learn/react-developer-tools

// Check Network tab for API calls
```

### Convex
```typescript
// View logs in Convex dashboard
console.log('Convex log:', value);

// Use Convex DevTools
// Open: npx convex dashboard
```

### Tests
```bash
# Run single test with verbose output
npm test -- --reporter=verbose site-generator.test.ts

# Debug test in VS Code
# Add breakpoint and use "Debug Test" in test file
```

## Common Issues

### Issue: "Module not found"
**Solution**: Check import paths use `@/` alias
```typescript
// ✅ Correct
import { Header } from '@/components/Header';

// ❌ Wrong
import { Header } from '../components/Header';
```

### Issue: "Hydration mismatch"
**Solution**: Ensure server and client render same content
```typescript
// ✅ Use useEffect for client-only code
useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null;
```

### Issue: "Property test fails randomly"
**Solution**: Check for non-deterministic behavior
```typescript
// ❌ Bad: Uses random values
const id = Math.random();

// ✅ Good: Uses generated values
fc.property(fc.integer(), (id) => { })
```

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Convex Docs**: https://docs.convex.dev
- **Clerk Docs**: https://clerk.com/docs
- **Vitest Docs**: https://vitest.dev
- **fast-check Docs**: https://fast-check.dev
- **TypeScript Handbook**: https://www.typescriptlang.org/docs
