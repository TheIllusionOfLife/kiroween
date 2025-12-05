---
inclusion: fileMatch
fileMatchPattern: "**/*.test.ts"
---

# Testing Guide - 90s Website Generator

## Testing Philosophy

We use a **dual testing approach**:
1. **Property-Based Tests** - Verify universal properties across all inputs
2. **Unit Tests** - Verify specific behaviors and edge cases

Both are essential and complement each other.

## Property-Based Testing with fast-check

### What is Property-Based Testing?

Instead of testing specific examples, we test **properties that should hold for all inputs**.

Example:
- ❌ Unit test: "generateSiteHTML with name='John' includes 'John'"
- ✅ Property test: "generateSiteHTML with ANY name includes that name"

### Writing Property Tests

#### 1. Identify the Property

Ask: "What should be true for ALL valid inputs?"

Examples:
- For any site config, the generated HTML should contain the user's name
- For any guestbook entry with valid length, it should be accepted
- For any site, editing and saving should preserve the creation date

#### 2. Generate Random Inputs

Use fast-check arbitraries:

```typescript
import * as fc from 'fast-check';

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
  name: fc.string({ minLength: 1 }),
  age: fc.integer({ min: 0, max: 120 }),
  email: fc.option(fc.emailAddress()),
})

// Arrays
fc.array(fc.string(), { minLength: 1, maxLength: 10 })
```

#### 3. Write the Property Test

```typescript
// **Feature: 90s-website-generator, Property N: [Description]**
it('Property N: [Description]', () => {
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
        
        // Assertions
        expect(result).toContain(config.name);
        expect(result).toContain(config.hobby);
      }
    ),
    { numRuns: 100 } // REQUIRED: Run 100 iterations
  );
});
```

### Property Test Patterns

#### Pattern 1: Round-Trip Properties
"Doing something then undoing it returns to original state"

```typescript
// **Feature: 90s-website-generator, Property 6: Site persistence round-trip**
it('Property 6: Site persistence round-trip', async () => {
  fc.assert(
    fc.asyncProperty(
      fc.record({ name: fc.string(), hobby: fc.string() }),
      async (config) => {
        // Save
        const siteId = await saveSite(config);
        
        // Retrieve
        const retrieved = await getSite(siteId);
        
        // Should match
        expect(retrieved.name).toBe(config.name);
        expect(retrieved.hobby).toBe(config.hobby);
      }
    ),
    { numRuns: 100 }
  );
});
```

#### Pattern 2: Invariant Properties
"Something that should always be true"

```typescript
// **Feature: 90s-website-generator, Property 7: New sites initialize with zero views**
it('Property 7: New sites initialize with zero views', async () => {
  fc.assert(
    fc.asyncProperty(
      fc.record({ name: fc.string(), hobby: fc.string() }),
      async (config) => {
        const siteId = await saveSite(config);
        const site = await getSite(siteId);
        
        // Invariant: new sites always have 0 views
        expect(site.views).toBe(0);
      }
    ),
    { numRuns: 100 }
  );
});
```

#### Pattern 3: Validation Properties
"Valid inputs are accepted, invalid inputs are rejected"

```typescript
// **Feature: 90s-website-generator, Property 10: Guestbook validation enforces length limits**
it('Property 10: Guestbook validation enforces length limits', () => {
  fc.assert(
    fc.property(
      fc.record({
        name: fc.string(),
        message: fc.string(),
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

#### Pattern 4: Metamorphic Properties
"Relationship between inputs and outputs"

```typescript
// **Feature: 90s-website-generator, Property 9: View count increments correctly**
it('Property 9: View count increments correctly', async () => {
  fc.assert(
    fc.asyncProperty(
      fc.record({ name: fc.string(), hobby: fc.string() }),
      fc.integer({ min: 1, max: 10 }),
      async (config, viewCount) => {
        const siteId = await saveSite(config);
        
        // View N times
        for (let i = 0; i < viewCount; i++) {
          await incrementViews(siteId);
        }
        
        const site = await getSite(siteId);
        
        // Views should equal number of increments
        expect(site.views).toBe(viewCount);
      }
    ),
    { numRuns: 100 }
  );
});
```

## Unit Testing

### When to Use Unit Tests

- Testing specific edge cases
- Testing error conditions
- Testing UI interactions
- Testing integration between components

### Unit Test Structure

```typescript
describe('Component/Function Name', () => {
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

### Example Unit Tests

```typescript
describe('generateSiteHTML', () => {
  it('includes user name in title', () => {
    const config = { name: 'Test User', hobby: 'Testing', theme: 'neon' };
    const html = generateSiteHTML(config);
    expect(html).toContain('<title>Test User');
  });
  
  it('excludes popups when addPopups is false', () => {
    const config = { name: 'Test', hobby: 'Test', theme: 'neon', addPopups: false };
    const html = generateSiteHTML(config);
    expect(html).not.toContain('alert(');
  });
  
  it('handles empty email gracefully', () => {
    const config = { name: 'Test', hobby: 'Test', theme: 'neon', email: '' };
    const html = generateSiteHTML(config);
    expect(html).not.toContain('Contact Me');
  });
});
```

## Test Organization

### File Structure
```
lib/
├── site-generator.ts
└── __tests__/
    ├── site-generator.test.ts      # Property + unit tests
    ├── site-generator.unit.test.ts # Unit tests only (if needed)
    └── site-generator.pbt.test.ts  # Property tests only (if needed)
```

### Test File Template

```typescript
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { functionUnderTest } from '../module';

describe('Module Name', () => {
  // Property-Based Tests
  describe('Property-Based Tests', () => {
    // **Feature: 90s-website-generator, Property N: Description**
    it('Property N: Description', () => {
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
    describe('specific behavior', () => {
      it('should handle specific case', () => {
        // test
      });
    });
  });
});
```

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run specific test file
npm test site-generator.test.ts

# Run tests with coverage
npm test -- --coverage
```

## Test Coverage Goals

- **Property Tests**: All correctness properties from design.md
- **Unit Tests**: 80%+ code coverage
- **Integration Tests**: Critical user flows

## Security Testing Patterns

### Pattern: XSS Prevention

Test that malicious inputs are safely escaped:

```typescript
describe('Security Tests', () => {
  // **Feature: 90s-website-generator, Property N: XSS Prevention**
  it('Property N: XSS Prevention', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string(), // Any string, including malicious
          hobby: fc.string(),
        }),
        (config) => {
          const html = generateSiteHTML(config);
          
          // Should not contain unescaped script tags
          expect(html).not.toMatch(/<script[^>]*>[^<]*alert/);
          
          // Should escape HTML entities
          if (config.name.includes('<')) {
            expect(html).toContain('&lt;');
          }
          if (config.name.includes('>')) {
            expect(html).toContain('&gt;');
          }
          if (config.name.includes('"')) {
            expect(html).toContain('&quot;');
          }
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('handles known XSS attack vectors', () => {
    const maliciousInputs = [
      '<script>alert("xss")</script>',
      '"><script>alert("xss")</script>',
      'javascript:alert("xss")',
      '<img src=x onerror=alert("xss")>',
      '<svg onload=alert("xss")>',
      '\'><script>alert(String.fromCharCode(88,83,83))</script>',
    ];
    
    maliciousInputs.forEach(input => {
      const html = generateSiteHTML({ 
        name: input, 
        hobby: 'test', 
        theme: 'neon' 
      });
      
      expect(html).not.toContain('<script>');
      expect(html).not.toContain('onerror=');
      expect(html).not.toContain('onload=');
      expect(html).not.toContain('javascript:');
    });
  });
});
```

### Pattern: Input Validation

Test that invalid inputs are rejected:

```typescript
describe('Validation Tests', () => {
  it('rejects inputs exceeding length limits', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string({ minLength: 51 }), // Over limit
          message: fc.string(),
        }),
        (entry) => {
          expect(() => validateGuestbookEntry(entry)).toThrow(/too long/i);
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('rejects empty required fields', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.constant(''),
          message: fc.string({ minLength: 1 }),
        }),
        (entry) => {
          expect(() => validateGuestbookEntry(entry)).toThrow(/required/i);
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('rejects whitespace-only inputs', () => {
    const whitespaceStrings = ['   ', '\t\t', '\n\n', '  \t\n  '];
    
    whitespaceStrings.forEach(input => {
      expect(() => validateGuestbookEntry({
        name: input,
        message: 'test'
      })).toThrow();
    });
  });
});
```

## Performance Testing Patterns

### Pattern: Query Efficiency

Test that queries use indexes:

```typescript
describe('Performance Tests', () => {
  it('uses index-backed queries', async () => {
    // This is more of a code review check, but you can test behavior
    const startTime = Date.now();
    
    // Create 1000 entries
    for (let i = 0; i < 1000; i++) {
      await createEntry({ siteId: 'test', name: `User ${i}`, message: 'Test' });
    }
    
    // Query should be fast with index
    const queryStart = Date.now();
    const entries = await getEntriesBySite('test');
    const queryTime = Date.now() - queryStart;
    
    // Should complete in under 100ms even with 1000 entries
    expect(queryTime).toBeLessThan(100);
    expect(entries.length).toBe(1000);
  });
});
```

### Pattern: Debouncing

Test that expensive operations are debounced:

```typescript
describe('Debouncing Tests', () => {
  it('debounces rapid updates', async () => {
    const mockGenerate = vi.fn();
    const debouncedGenerate = debounce(mockGenerate, 500);
    
    // Trigger 10 times rapidly
    for (let i = 0; i < 10; i++) {
      debouncedGenerate();
    }
    
    // Should not have called yet
    expect(mockGenerate).not.toHaveBeenCalled();
    
    // Wait for debounce
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Should have called exactly once
    expect(mockGenerate).toHaveBeenCalledTimes(1);
  });
});
```

## Negative Test Cases

Always include tests for failure scenarios:

```typescript
describe('Negative Test Cases', () => {
  describe('Error Handling', () => {
    it('handles missing environment variables', () => {
      delete process.env.NEXT_PUBLIC_CONVEX_URL;
      
      expect(() => {
        new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
      }).toThrow(/missing.*environment/i);
    });
    
    it('handles null user during hydration', () => {
      const { result } = renderHook(() => useUser());
      
      // Simulate hydration state
      act(() => {
        result.current = { isSignedIn: true, user: null };
      });
      
      // Should not crash
      expect(() => {
        const userId = result.current.user?.id;
      }).not.toThrow();
    });
  });
  
  describe('Edge Cases', () => {
    it('handles empty arrays', () => {
      const result = processSites([]);
      expect(result).toEqual([]);
    });
    
    it('handles undefined optional fields', () => {
      const html = generateSiteHTML({
        name: 'Test',
        hobby: 'Test',
        theme: 'neon',
        email: undefined,
      });
      
      expect(html).not.toContain('mailto:');
    });
    
    it('handles very long inputs gracefully', () => {
      const longString = 'a'.repeat(10000);
      
      expect(() => {
        validateConfig({ name: longString, hobby: 'test' });
      }).toThrow(/too long/i);
    });
  });
});
```

## Common Pitfalls

### ❌ Don't: Test implementation details
```typescript
// Bad - testing internal state
expect(component.state.value).toBe('test');
```

### ✅ Do: Test observable behavior
```typescript
// Good - testing what user sees
expect(screen.getByText('test')).toBeInTheDocument();
```

### ❌ Don't: Use specific values in property tests
```typescript
// Bad - defeats the purpose of property testing
fc.assert(
  fc.property(fc.constant('John'), (name) => {
    // ...
  })
);
```

### ✅ Do: Use generators for all inputs
```typescript
// Good - tests all possible names
fc.assert(
  fc.property(fc.string({ minLength: 1 }), (name) => {
    // ...
  })
);
```

### ❌ Don't: Skip negative test cases
```typescript
// Bad - only testing happy path
it('accepts valid input', () => {
  expect(validate({ name: 'John' })).toBe(true);
});
```

### ✅ Do: Test both valid and invalid inputs
```typescript
// Good - testing both paths
it('accepts valid input', () => {
  expect(validate({ name: 'John' })).toBe(true);
});

it('rejects invalid input', () => {
  expect(() => validate({ name: '' })).toThrow();
  expect(() => validate({ name: '<script>' })).toThrow();
});
```

## Debugging Failed Property Tests

When a property test fails, fast-check provides a **minimal failing example**:

```
Property failed after 47 tests
Counterexample: { name: "A", hobby: "" }
```

This is the **smallest input** that causes the failure. Use it to:
1. Understand why it fails
2. Fix the bug
3. Optionally add it as a unit test

## Test Maintenance

- **Run tests before committing**
- **Fix failing tests immediately**
- **Update tests when requirements change**
- **Remove obsolete tests**
- **Keep tests simple and readable**

## Resources

- [fast-check documentation](https://fast-check.dev/)
- [Vitest documentation](https://vitest.dev/)
- [Property-Based Testing Guide](https://fsharpforfunandprofit.com/posts/property-based-testing/)
