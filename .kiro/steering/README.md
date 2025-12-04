# Steering Documentation - 90s Website Generator

## What is Steering?

Steering docs provide **context and guidelines** that are automatically included when working on this project. They help maintain consistency, quality, and best practices.

## Available Steering Docs

### Core Docs (Standard Pattern - Always Included)

#### 1. `product.md` ⭐
**What the product does**
- Core features and user flows
- Quality standards
- Success metrics
- Development status

#### 2. `tech.md` ⭐
**Technical implementation**
- Tech stack and build system
- Common commands
- Code style conventions
- Testing framework
- Debugging tips

#### 3. `structure.md` ⭐
**Project organization**
- Directory layout
- Module architecture
- Naming conventions
- Component patterns
- State management structure

---

### Specialized Docs (Deep Dives)

#### 4. `project-overview.md` (Always Included)
**Detailed project context**
- Combines product overview with current status
- More detailed than product.md
- Includes task tracking

#### 5. `coding-standards.md` (Always Included)
**Comprehensive coding guidelines**
- TypeScript, React, Convex standards
- More detailed than tech.md
- Includes error handling and performance

#### 6. `testing-guide.md` (Auto-included for `*.test.ts`)
**Deep dive on testing**
- Property-based testing philosophy
- fast-check patterns and examples
- Test organization and debugging

#### 7. `spec-workflow.md` (Auto-included for `.kiro/specs/**/*`)
**Spec-driven development**
- EARS syntax and INCOSE rules
- Correctness properties
- Property test mapping

#### 8. `deployment-guide.md` (Manual - use `#deployment-guide`)
**Deployment procedures**
- Step-by-step deployment
- Environment setup
- Monitoring and troubleshooting

---

## How Steering Works

### Automatic Inclusion

Some docs are **always included**:
```yaml
---
inclusion: always
---
```

These provide baseline context for every interaction.

### File-Match Inclusion

Some docs are included when **editing specific files**:
```yaml
---
inclusion: fileMatch
fileMatchPattern: "**/*.test.ts"
---
```

This provides relevant context only when needed.

### Manual Inclusion

Some docs are included **only when requested**:
```yaml
---
inclusion: manual
---
```

Reference these with `#filename` in chat (e.g., `#deployment-guide`).

## Quick Reference

### Need Quick Overview?
→ Read **`product.md`**, **`tech.md`**, **`structure.md`** (standard pattern)

### Need Detailed Context?
→ Read `project-overview.md` and `coding-standards.md` (always included)

### Writing Tests?
→ Read `testing-guide.md` (auto-loads for test files)

### Creating Specs?
→ Read `spec-workflow.md` (auto-loads for spec files)

### Deploying?
→ Read `deployment-guide.md` (use `#deployment-guide`)

## Two Approaches

### Standard Pattern (Recommended for Quick Reference)
- **`product.md`** - What we're building
- **`tech.md`** - How we're building it
- **`structure.md`** - How it's organized

### Detailed Pattern (Comprehensive Guidance)
- **`project-overview.md`** - Product + status
- **`coding-standards.md`** - Tech + standards
- **`testing-guide.md`** - Testing deep dive
- **`spec-workflow.md`** - Spec methodology
- **`deployment-guide.md`** - Deployment procedures

**Both are valid!** Use standard for quick reference, detailed for comprehensive guidance.

## Updating Steering Docs

When project practices change:

1. **Identify the change**
   - New pattern?
   - Better approach?
   - Common mistake?

2. **Update relevant doc**
   - Add new section
   - Update examples
   - Clarify guidelines

3. **Commit changes**
   ```bash
   git add .kiro/steering/
   git commit -m "docs: update steering for [change]"
   ```

## Benefits

✅ **Consistency** - Everyone follows same patterns
✅ **Quality** - Best practices built-in
✅ **Onboarding** - New developers get context automatically
✅ **Efficiency** - No need to repeat guidelines
✅ **Maintainability** - Standards documented and enforced

## Tips

1. **Reference steering docs** when asking questions
2. **Update docs** when you discover better patterns
3. **Keep docs concise** - focus on actionable guidance
4. **Use examples** - show, don't just tell
5. **Link to external resources** for deep dives

## Project-Specific Notes

### ⚠️ CRITICAL: Directory Structure

**NEVER modify `vibe_coding/` directory!**
- `vibe_coding/version1/` - Frozen vanilla JS baseline (reference only)
- `vibe_coding/version2/` - Frozen Next.js reference (reference only)
- **All active development happens at the project root**

### This Project Uses:
- **Spec-driven development** (see `spec-workflow.md`)
- **Property-based testing** (see `testing-guide.md`)
- **EARS requirements** (see `spec-workflow.md`)
- **Dual testing approach** (property + unit tests)

### Key Principles:
1. **Correctness first** - Property tests verify universal properties
2. **Incremental development** - One task at a time
3. **Test before merge** - All tests must pass
4. **Document decisions** - Update specs when requirements change
5. **Never touch vibe_coding/** - It's frozen for reference

## Getting Help

- **Unclear guideline?** Ask for clarification
- **Missing information?** Suggest additions
- **Better approach?** Propose updates
- **Found error?** Report and fix

## Maintenance

Review steering docs:
- **Monthly** - Check for outdated information
- **After major changes** - Update affected docs
- **When onboarding** - Verify docs are helpful
- **When confused** - Improve clarity

---

**Remember**: Steering docs are living documents. Keep them updated and useful!
