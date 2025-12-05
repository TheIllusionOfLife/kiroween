---
inclusion: always
---

# Security & Performance Checklist

Use this checklist before committing code to catch common issues.

## Security Checklist

### Input Validation & Sanitization
- [ ] All user inputs are validated before processing
- [ ] All user inputs are escaped/sanitized before rendering in HTML
- [ ] User inputs in JavaScript contexts use `JSON.stringify()`
- [ ] User inputs in URLs use `encodeURIComponent()`
- [ ] No `dangerouslySetInnerHTML` without sanitization
- [ ] File uploads validate file type and size
- [ ] SQL queries use parameterized statements (if applicable)

### Authentication & Authorization
- [ ] No non-null assertions (`!`) without runtime checks
- [ ] User object checked for null before accessing properties
- [ ] Authentication state handled during hydration phase
- [ ] Protected routes verify authentication
- [ ] User permissions checked before sensitive operations
- [ ] Session tokens stored securely (httpOnly cookies)

### Environment & Configuration
- [ ] All required environment variables validated at startup
- [ ] No hardcoded secrets or API keys in code
- [ ] Environment variables use descriptive error messages when missing
- [ ] Sensitive data not logged or exposed in errors
- [ ] CORS configured appropriately
- [ ] CSP headers configured (if applicable)

### Dependencies & External Resources
- [ ] External dependencies have fallback mechanisms
- [ ] External URLs validated before use
- [ ] No hotlinking to third-party resources without permission
- [ ] Critical assets self-hosted when possible
- [ ] Dependencies regularly updated for security patches

### Data Protection
- [ ] Sensitive data encrypted at rest (if applicable)
- [ ] Sensitive data encrypted in transit (HTTPS)
- [ ] PII handled according to privacy policy
- [ ] User data deletion implemented (if required)
- [ ] Rate limiting on sensitive endpoints

## Performance Checklist

### Database & Queries
- [ ] All database queries use indexes
- [ ] No N+1 query patterns (batch related queries)
- [ ] Pagination implemented for large result sets
- [ ] Database queries have reasonable timeouts
- [ ] Expensive queries cached when appropriate
- [ ] Query results limited to necessary fields only

### Client-Side Performance
- [ ] Expensive operations debounced (500ms minimum)
- [ ] Computed values memoized with `useMemo`
- [ ] Components memoized with `React.memo` when appropriate
- [ ] Event handlers use `useCallback` with stable dependencies
- [ ] Large lists virtualized (if >100 items)
- [ ] Images optimized and lazy-loaded

### Resource Management
- [ ] All `useEffect` hooks have cleanup functions
- [ ] Timers and intervals cleared on unmount
- [ ] Event listeners removed on unmount
- [ ] Subscriptions unsubscribed on unmount
- [ ] File handles closed after use
- [ ] Memory leaks checked with profiler

### Network & Loading
- [ ] API responses compressed (gzip/brotli)
- [ ] Static assets cached with appropriate headers
- [ ] Code split by route
- [ ] Critical CSS inlined
- [ ] Fonts preloaded
- [ ] Loading states shown for async operations

### Bundle Size
- [ ] Tree-shaking enabled
- [ ] Unused dependencies removed
- [ ] Large libraries imported selectively
- [ ] Bundle analyzed for bloat
- [ ] Images compressed and properly sized
- [ ] SVGs optimized

## Reliability Checklist

### Error Handling
- [ ] All async operations have try-catch blocks
- [ ] User-friendly error messages displayed
- [ ] Detailed errors logged for debugging
- [ ] Error boundaries catch React errors
- [ ] Failed operations can be retried
- [ ] Graceful degradation for missing features

### Edge Cases
- [ ] Empty states handled (no data)
- [ ] Loading states handled (data fetching)
- [ ] Error states handled (failed requests)
- [ ] Offline state handled (no network)
- [ ] Slow network handled (timeouts)
- [ ] Large datasets handled (pagination)

### Browser Compatibility
- [ ] Tested in Chrome, Firefox, Safari, Edge
- [ ] Polyfills included for older browsers (if needed)
- [ ] Feature detection used for modern APIs
- [ ] Fallbacks provided for unsupported features
- [ ] Mobile browsers tested
- [ ] Touch interactions work correctly

## Accessibility Checklist

### Semantic HTML
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Semantic elements used (`<nav>`, `<main>`, `<article>`)
- [ ] Forms use `<label>` elements
- [ ] Buttons use `<button>` not `<div>`
- [ ] Links use `<a>` with proper href
- [ ] Lists use `<ul>`, `<ol>`, `<li>`

### ARIA & Screen Readers
- [ ] ARIA labels on interactive elements
- [ ] ARIA roles on custom components
- [ ] ARIA live regions for dynamic content
- [ ] Alt text on all images
- [ ] Screen reader tested (if possible)
- [ ] Focus order logical

### Keyboard Navigation
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible
- [ ] Tab order logical
- [ ] Escape key closes modals
- [ ] Enter/Space activate buttons
- [ ] Arrow keys navigate lists/menus

### Visual Design
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Color not sole indicator of information
- [ ] Text resizable to 200% without breaking
- [ ] Touch targets at least 44x44px
- [ ] Animations respect prefers-reduced-motion
- [ ] Focus indicators have 3:1 contrast

## Testing Checklist

### Test Coverage
- [ ] All correctness properties have property tests
- [ ] Property tests run 100+ iterations
- [ ] Negative test cases included (invalid inputs)
- [ ] Security test cases included (malicious inputs)
- [ ] Edge cases covered with unit tests
- [ ] Integration tests for critical flows

### Test Quality
- [ ] Tests are deterministic (no random failures)
- [ ] Tests are isolated (no shared state)
- [ ] Tests are fast (<1s per test)
- [ ] Test names describe what they test
- [ ] Tests use appropriate assertions
- [ ] Mocks used sparingly

### Test Execution
- [ ] All tests pass locally
- [ ] All tests pass in CI
- [ ] No skipped or disabled tests
- [ ] No console errors during tests
- [ ] Coverage meets minimum threshold
- [ ] Performance tests pass (if applicable)

## Code Quality Checklist

### TypeScript
- [ ] No `any` types (use `unknown` if needed)
- [ ] All function parameters typed
- [ ] All function return types typed
- [ ] Interfaces used for object shapes
- [ ] Enums or unions for constants
- [ ] Strict mode enabled

### Code Organization
- [ ] Files under 300 lines
- [ ] Functions under 50 lines
- [ ] Cyclomatic complexity under 10
- [ ] No duplicate code (DRY)
- [ ] Clear separation of concerns
- [ ] Consistent naming conventions

### Documentation
- [ ] Complex logic has comments
- [ ] Public APIs have JSDoc
- [ ] README updated if needed
- [ ] Breaking changes documented
- [ ] Migration guide provided (if needed)
- [ ] Examples provided for new features

## Pre-Commit Checklist

Quick checklist before committing:

- [ ] Code formatted (Prettier/ESLint)
- [ ] All tests passing
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] No TODO comments without tickets
- [ ] Commit message follows convention
- [ ] Changes reviewed locally
- [ ] No sensitive data in commit

## Pre-PR Checklist

Before creating a pull request:

- [ ] All checklist items above completed
- [ ] Branch up to date with main
- [ ] No merge conflicts
- [ ] CI passing
- [ ] Self-reviewed changes
- [ ] Screenshots added (if UI changes)
- [ ] Breaking changes documented
- [ ] Migration steps documented (if needed)

## When to Skip Checklist Items

Some items may not apply to every change:

- **Prototypes**: Can skip performance optimization
- **Internal tools**: Can relax accessibility requirements
- **Experiments**: Can skip comprehensive testing
- **Documentation**: Can skip most technical checks

**However, NEVER skip:**
- Security validation
- Input sanitization
- Error handling
- Basic testing

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web.dev Performance](https://web.dev/performance/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Performance](https://react.dev/learn/render-and-commit)
