---
inclusion: fileMatch
fileMatchPattern: ".kiro/specs/**/*"
---

# Spec-Driven Development Workflow

## Overview

This project uses **spec-driven development** to ensure correctness and maintainability. The workflow has three phases:

1. **Requirements** - What the system should do (EARS + INCOSE)
2. **Design** - How the system should work (Architecture + Properties)
3. **Implementation** - Building the system (Tasks + Tests)

## Phase 1: Requirements

### Requirement Categories

Requirements are divided into two categories:

#### 1. Functional Requirements (FR)
What the system does - features and behaviors

#### 2. Non-Functional Requirements (NFR)
How the system performs - security, performance, reliability

### Format: EARS Syntax

Every requirement follows one of six patterns:

1. **Ubiquitous**: `THE <system> SHALL <response>`
2. **Event-driven**: `WHEN <trigger>, THE <system> SHALL <response>`
3. **State-driven**: `WHILE <condition>, THE <system> SHALL <response>`
4. **Unwanted event**: `IF <condition>, THEN THE <system> SHALL <response>`
5. **Optional feature**: `WHERE <option>, THE <system> SHALL <response>`
6. **Complex**: `[WHERE] [WHILE] [WHEN/IF] THE <system> SHALL <response>`

### INCOSE Quality Rules

Every requirement must be:
- ✅ **Active voice** - "System SHALL do X" not "X SHALL be done"
- ✅ **No vague terms** - "quickly", "adequate" are forbidden
- ✅ **No escape clauses** - "where possible" is forbidden
- ✅ **No negatives** - "SHALL not" is forbidden (use positive statements)
- ✅ **One thought** - Each requirement tests one thing
- ✅ **Measurable** - Can be verified objectively
- ✅ **Consistent terminology** - Use glossary terms
- ✅ **No pronouns** - "it", "them" are forbidden
- ✅ **Solution-free** - Focus on WHAT, not HOW

### Example Functional Requirement

```markdown
### Requirement 1: Site Generation

**User Story:** As a user, I want to generate a 90s-style personal homepage by filling out a simple form, so that I can create an authentic retro website without coding knowledge.

#### Acceptance Criteria

1. WHEN a user provides a name, hobby, and optional email THEN the System SHALL generate a complete HTML website incorporating these details
2. WHEN a user selects a theme from the available options THEN the System SHALL apply the corresponding visual styling to the generated site
3. WHEN the System generates a site THEN the System SHALL create valid HTML5 markup that renders correctly in modern browsers
```

### Non-Functional Requirements (MANDATORY)

Every spec MUST include non-functional requirements in these categories:

#### Security Requirements

```markdown
## Non-Functional Requirements

### Security

**NFR-SEC-1: Input Sanitization**
- WHEN the System receives user input THEN the System SHALL escape all HTML special characters before rendering
- WHEN the System embeds user input in JavaScript THEN the System SHALL use JSON.stringify for safe encoding

**NFR-SEC-2: Environment Validation**
- WHEN the System starts THEN the System SHALL validate all required environment variables are present
- WHEN an environment variable is missing THEN the System SHALL throw a descriptive error message

**NFR-SEC-3: Authentication Safety**
- WHEN the System accesses user data THEN the System SHALL verify the user object is not null before accessing properties
- WHEN authentication state is uncertain THEN the System SHALL handle gracefully without crashes
```

#### Performance Requirements

```markdown
### Performance

**NFR-PERF-1: Query Efficiency**
- WHEN the System queries the database THEN the System SHALL use index-backed queries
- WHEN the System fetches related data THEN the System SHALL batch queries to avoid N+1 patterns
- WHEN a page loads THEN the System SHALL complete in under 2 seconds with 100 records

**NFR-PERF-2: Client-Side Optimization**
- WHEN the System performs expensive operations THEN the System SHALL debounce to maximum 1 execution per 500ms
- WHEN the System computes derived values THEN the System SHALL memoize results
- WHEN a component unmounts THEN the System SHALL cleanup all pending operations
```

#### Reliability Requirements

```markdown
### Reliability

**NFR-REL-1: External Dependencies**
- WHEN the System depends on external resources THEN the System SHALL provide fallback mechanisms
- WHEN an external resource fails THEN the System SHALL continue functioning with degraded features
- WHEN possible THEN the System SHALL self-host critical assets

**NFR-REL-2: Error Handling**
- WHEN an error occurs THEN the System SHALL provide user-friendly error messages
- WHEN an operation fails THEN the System SHALL log detailed error information for debugging
- WHEN the System encounters invalid state THEN the System SHALL recover gracefully
```

#### Accessibility Requirements

```markdown
### Accessibility

**NFR-ACC-1: WCAG Compliance**
- WHEN the System renders UI THEN the System SHALL meet WCAG 2.1 Level AA standards
- WHEN the System uses color THEN the System SHALL maintain 4.5:1 contrast ratio for text
- WHEN the System provides interactive elements THEN the System SHALL support keyboard navigation
```

## Phase 2: Design

### Structure

1. **Overview** - High-level description
2. **Architecture** - System components and data flow
3. **Components and Interfaces** - Detailed component specs
4. **Data Models** - TypeScript interfaces
5. **Security Design** - How security requirements are met (NEW)
6. **Performance Design** - How performance requirements are met (NEW)
7. **Correctness Properties** - Testable properties
8. **Error Handling** - How errors are handled
9. **Testing Strategy** - Unit + property tests + negative tests (UPDATED)

### Correctness Properties

Properties are **universal statements** that should hold for all valid inputs.

#### Format

```markdown
### Property N: [Name]

*For any* [input description], [expected behavior].

**Validates: Requirements X.Y**

**Rationale**: [Why this property matters]
```

#### Example

```markdown
### Property 1: Site generation incorporates all configuration

*For any* valid site configuration (name, hobby, email, theme, feature toggles, audio settings), the generated HTML should contain all specified values and include/exclude features according to the toggles.

**Validates: Requirements 1.1, 1.2, 1.3, 1.4**

**Rationale**: This comprehensive property ensures the core generation function correctly transforms any configuration into HTML. By testing with random configurations, we verify that all user inputs are respected and properly incorporated.
```

### Security Design Section (MANDATORY)

```markdown
## Security Design

### Input Sanitization

**Implementation:**
- Create `escapeHtml()` helper function
- Apply to all user inputs before template interpolation
- Use `JSON.stringify()` for inline JavaScript strings

**Code Example:**
```typescript
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
```

**Validates: NFR-SEC-1**

### Environment Variable Validation

**Implementation:**
- Check all required env vars at application startup
- Throw descriptive errors if missing
- Never use non-null assertion operator without checks

**Code Example:**
```typescript
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error("Missing NEXT_PUBLIC_CONVEX_URL environment variable");
}
```

**Validates: NFR-SEC-2**

### Authentication Safety

**Implementation:**
- Always check user object before accessing properties
- Handle hydration phase gracefully
- Provide fallback for unauthenticated state

**Code Example:**
```typescript
if (!isSignedIn || !user) {
  // Handle unauthenticated state
  return;
}
// Safe to access user.id now
```

**Validates: NFR-SEC-3**
```

### Performance Design Section (MANDATORY)

```markdown
## Performance Design

### Query Optimization

**Strategy:**
- Use index-backed queries for all database lookups
- Batch related queries using Promise.all()
- Implement pagination for large result sets

**Code Example:**
```typescript
// ✅ Good: Index-backed query
const entries = await ctx.db
  .query("guestbookEntries")
  .withIndex("by_site", (q) => q.eq("siteId", siteId))
  .collect();

// ❌ Bad: Full table scan
const entries = await ctx.db
  .query("guestbookEntries")
  .filter((q) => q.eq(q.field("siteId"), siteId))
  .collect();
```

**Validates: NFR-PERF-1**

### Client-Side Optimization

**Strategy:**
- Debounce expensive operations (preview generation)
- Use useCallback with stable dependencies
- Cleanup pending operations on unmount

**Code Example:**
```typescript
const updatePreview = useCallback(() => {
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }
  
  timeoutRef.current = setTimeout(() => {
    const config = useGeneratorStore.getState().config;
    const html = generateFn(config);
    setPreviewHtml(html);
  }, delay);
}, [generateFn, delay]); // Stable dependencies only

useEffect(() => {
  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
}, []);
```

**Validates: NFR-PERF-2**
```

### Property Patterns

1. **Round-Trip**: `encode(decode(x)) == x`
2. **Invariant**: `property(x) == property(transform(x))`
3. **Idempotence**: `f(x) == f(f(x))`
4. **Metamorphic**: `relationship(input, output) holds`
5. **Validation**: `valid(x) => accept(x) && invalid(x) => reject(x)`
6. **Security**: `malicious(x) => safe(output(x))` (NEW)
7. **Performance**: `time(operation) < threshold` (NEW)

## Phase 3: Implementation

### Task Structure

```markdown
- [ ] N. Task Name
  - Description of what to implement
  - Specific files to create/modify
  - _Requirements: X.Y, Z.A_

- [ ] N.1 Write property test for task
  - **Property M: [Name]**
  - **Validates: Requirements X.Y**
```

### Task Execution Rules

1. **One task at a time** - Complete fully before moving to next
2. **Implement before testing** - Write code first, then tests
3. **Property tests required** - All properties must be tested
4. **100 iterations minimum** - Property tests run 100 times
5. **Tag format required** - `**Feature: 90s-website-generator, Property N: [text]**`

### Task Workflow

```
1. Mark task as "in_progress"
2. Read requirements and design
3. Implement the feature
4. Write property test (if applicable)
5. Write unit tests (if needed)
6. Run all tests
7. Fix any failures
8. Mark task as "completed"
9. Move to next task
```

## Correctness Properties → Property Tests

### Mapping Process

**Design Property:**
```markdown
### Property 1: Site generation incorporates all configuration

*For any* valid site configuration, the generated HTML should contain all specified values.
```

**Property Test:**
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

### Security Property Tests (NEW)

**Design Property:**
```markdown
### Property N: XSS Prevention

*For any* user input containing HTML special characters, the generated output should escape them safely.
```

**Property Test:**
```typescript
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
      }
    ),
    { numRuns: 100 }
  );
});
```

### Negative Test Cases (NEW)

Always include tests for invalid/malicious inputs:

```typescript
describe('Negative Test Cases', () => {
  it('rejects empty required fields', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.constant(''),
          hobby: fc.string(),
        }),
        (config) => {
          expect(() => validateConfig(config)).toThrow();
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('handles malicious script injection safely', () => {
    const maliciousInputs = [
      '<script>alert("xss")</script>',
      '"><script>alert("xss")</script>',
      'javascript:alert("xss")',
      '<img src=x onerror=alert("xss")>',
    ];
    
    maliciousInputs.forEach(input => {
      const html = generateSiteHTML({ name: input, hobby: 'test', theme: 'neon' });
      expect(html).not.toContain('<script>');
      expect(html).not.toContain('onerror=');
      expect(html).not.toContain('javascript:');
    });
  });
});

## Benefits of Spec-Driven Development

### 1. Correctness
- Properties define what "correct" means
- Tests verify correctness automatically
- Catches bugs early

### 2. Documentation
- Requirements explain WHY
- Design explains HOW
- Tests demonstrate WHAT

### 3. Maintainability
- Clear structure for changes
- Tests prevent regressions
- Easy to onboard new developers

### 4. Confidence
- Comprehensive test coverage
- Property tests find edge cases
- Safe to refactor

## Common Pitfalls

### ❌ Don't: Skip requirements
Writing code without requirements leads to:
- Unclear goals
- Missing features
- Scope creep

### ❌ Don't: Skip design
Jumping to implementation leads to:
- Poor architecture
- Hard to test code
- Technical debt

### ❌ Don't: Skip property tests
Only unit tests miss:
- Edge cases
- Unexpected inputs
- General correctness

### ✅ Do: Follow the workflow
Requirements → Design → Implementation ensures:
- Clear goals
- Good architecture
- Comprehensive testing

## Updating Specs

When requirements change:

1. **Update requirements.md**
   - Add/modify acceptance criteria
   - Follow EARS syntax

2. **Update design.md**
   - Add/modify correctness properties
   - Update architecture if needed

3. **Update tasks.md**
   - Add/modify implementation tasks
   - Add corresponding property tests

4. **Implement changes**
   - Follow task workflow
   - Update existing tests

## Architecture Decision Records (ADRs)

For significant technical decisions, create an ADR:

### ADR Template

```markdown
# ADR-NNN: [Decision Title]

## Status
[Proposed | Accepted | Deprecated | Superseded]

## Context
What is the issue we're facing? What factors are at play?

## Decision
What decision did we make?

## Consequences
What are the positive and negative outcomes?

### Positive
- ✅ Benefit 1
- ✅ Benefit 2

### Negative
- ❌ Drawback 1
- ❌ Drawback 2

### Neutral
- ℹ️ Consideration 1

## Alternatives Considered
What other options did we evaluate?

1. **Option A**: Why we didn't choose it
2. **Option B**: Why we didn't choose it
```

### Example ADR

```markdown
# ADR-001: Self-Host Audio Files

## Status
Accepted

## Context
The application needs background music for generated sites. We could:
1. Hotlink to external services (Bensound)
2. Self-host in public/ directory
3. Use a CDN service

## Decision
Self-host audio files in `public/audio/` directory.

## Consequences

### Positive
- ✅ No external dependencies
- ✅ Faster loading (same origin)
- ✅ No licensing/hotlinking issues
- ✅ Full control over availability

### Negative
- ❌ Increases bundle size (~2MB)
- ❌ Need to manage audio files
- ❌ Need to ensure proper licensing

### Neutral
- ℹ️ Can switch to CDN later if needed

## Alternatives Considered

1. **Bensound Hotlinking**: Violates terms of service, unreliable
2. **CDN Service**: Adds complexity, monthly cost
```

## Pre-Implementation Checklist

Before starting implementation, verify:

### Requirements Checklist
- [ ] All functional requirements documented
- [ ] All non-functional requirements included:
  - [ ] Security requirements (NFR-SEC-*)
  - [ ] Performance requirements (NFR-PERF-*)
  - [ ] Reliability requirements (NFR-REL-*)
  - [ ] Accessibility requirements (NFR-ACC-*)
- [ ] All requirements follow EARS syntax
- [ ] All requirements pass INCOSE quality rules
- [ ] Glossary defines all technical terms

### Design Checklist
- [ ] Architecture diagram included
- [ ] All components documented
- [ ] Data models defined with TypeScript interfaces
- [ ] Security design section completed
- [ ] Performance design section completed
- [ ] All correctness properties identified
- [ ] Error handling strategy documented
- [ ] Testing strategy includes:
  - [ ] Property tests for all properties
  - [ ] Negative test cases for security
  - [ ] Unit tests for edge cases

### Tasks Checklist
- [ ] All requirements mapped to tasks
- [ ] Tasks in logical dependency order
- [ ] Each property has corresponding test task
- [ ] Security tasks included (input sanitization, validation)
- [ ] Performance tasks included (query optimization, debouncing)
- [ ] Checkpoint tasks at reasonable intervals

### ADR Checklist
- [ ] All significant decisions documented
- [ ] External dependencies justified
- [ ] Technology choices explained
- [ ] Trade-offs clearly stated

## Spec Review Process

Before implementation:

1. **Requirements Review**
   - All acceptance criteria clear?
   - EARS syntax correct?
   - INCOSE rules followed?
   - Non-functional requirements included?

2. **Design Review**
   - Architecture makes sense?
   - All properties testable?
   - Error handling covered?
   - Security design complete?
   - Performance design complete?

3. **Tasks Review**
   - All requirements covered?
   - Tasks in logical order?
   - Property tests included?
   - Security tasks included?
   - Performance tasks included?

## Resources

- **EARS Guide**: https://alistairmavin.com/ears/
- **INCOSE Guide**: https://www.incose.org/
- **Property-Based Testing**: https://fsharpforfunandprofit.com/pbt/
- **fast-check Docs**: https://fast-check.dev/
