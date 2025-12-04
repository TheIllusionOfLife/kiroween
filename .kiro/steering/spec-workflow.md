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

### Example Requirement

```markdown
### Requirement 1: Site Generation

**User Story:** As a user, I want to generate a 90s-style personal homepage by filling out a simple form, so that I can create an authentic retro website without coding knowledge.

#### Acceptance Criteria

1. WHEN a user provides a name, hobby, and optional email THEN the System SHALL generate a complete HTML website incorporating these details
2. WHEN a user selects a theme from the available options THEN the System SHALL apply the corresponding visual styling to the generated site
3. WHEN the System generates a site THEN the System SHALL create valid HTML5 markup that renders correctly in modern browsers
```

## Phase 2: Design

### Structure

1. **Overview** - High-level description
2. **Architecture** - System components and data flow
3. **Components and Interfaces** - Detailed component specs
4. **Data Models** - TypeScript interfaces
5. **Correctness Properties** - Testable properties
6. **Error Handling** - How errors are handled
7. **Testing Strategy** - Unit + property tests

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

### Property Patterns

1. **Round-Trip**: `encode(decode(x)) == x`
2. **Invariant**: `property(x) == property(transform(x))`
3. **Idempotence**: `f(x) == f(f(x))`
4. **Metamorphic**: `relationship(input, output) holds`
5. **Validation**: `valid(x) => accept(x) && invalid(x) => reject(x)`

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

## Spec Review Process

Before implementation:

1. **Requirements Review**
   - All acceptance criteria clear?
   - EARS syntax correct?
   - INCOSE rules followed?

2. **Design Review**
   - Architecture makes sense?
   - All properties testable?
   - Error handling covered?

3. **Tasks Review**
   - All requirements covered?
   - Tasks in logical order?
   - Property tests included?

## Resources

- **EARS Guide**: https://alistairmavin.com/ears/
- **INCOSE Guide**: https://www.incose.org/
- **Property-Based Testing**: https://fsharpforfunandprofit.com/pbt/
- **fast-check Docs**: https://fast-check.dev/
