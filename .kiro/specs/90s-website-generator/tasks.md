# Implementation Plan: 90s Website Generator

## Overview

This implementation plan breaks down the 90s Website Generator into discrete, actionable coding tasks. Each task builds incrementally on previous work, with property-based tests placed close to implementation to catch errors early. The plan focuses on core functionality first, with optional testing tasks marked with `*`.

---

## Tasks

- [x] 1. Set up authentication with Clerk
  - Install and configure Clerk for GitHub OAuth
  - Create authentication provider component
  - Add sign-in/sign-out UI components
  - Set up middleware for protected routes
  - _Requirements: 21.1, 21.2, 21.3, 21.4, 21.5_

- [x] 2. Update Convex schema for new features
  - Add userId field to sites table
  - Add audio fields (bgmTrack, soundEffects) to sites table
  - Add customization fields (customFonts, customColors) to sites table
  - Add updatedAt timestamp to sites table
  - Create users table synced from Clerk
  - Add indexes for userId queries
  - _Requirements: 6.2, 19.4, 19.5, 19.8, 20.1, 20.3_

- [x] 3. Implement Zustand store for client state
  - Create store with form state (name, hobby, email, theme, toggles, audio)
  - Add actions for updating form fields
  - Add edit mode state management
  - Add debounced preview update logic
  - _Requirements: 24.1, 24.4_

- [x] 4. Enhance site generator with audio support
  - Add BGM audio element generation
  - Add sound effect attachment to buttons
  - Support multiple audio formats (MP3, OGG, WAV)
  - Implement audio controls (pause, volume)
  - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 20.6_

- [x] 4.1 Write property test for audio generation
  - **Property 4: Audio features are included when configured**
  - **Validates: Requirements 1.4, 20.1, 20.3, 20.4**

- [x] 5. Update template presets with audio and diversity
  - Add bgmTrack and soundEffects to all 6 presets
  - Ensure each preset uses different theme combinations
  - Vary feature toggles across presets
  - Add custom fonts/colors to some presets for variety
  - _Requirements: 3.2, 3.3, 3.4, 3.8, 3.9_

- [x] 5.1 Write property test for preset diversity
  - **Property 5: Presets demonstrate feature diversity**
  - **Validates: Requirements 3.3, 3.4**

- [x] 6. Implement site generation with all features
  - Update generateSiteHTML to accept full SiteConfig
  - Integrate audio elements into generated HTML
  - Support custom fonts and colors
  - Ensure all styles and scripts are inline
  - Generate valid HTML5 markup
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 6.1 Write property test for site generation
  - **Property 1: Site generation incorporates all configuration**
  - **Validates: Requirements 1.1, 1.2, 1.3, 1.4**

- [x] 6.2 Write property test for HTML validity
  - **Property 2: Generated HTML is valid and self-contained**
  - **Validates: Requirements 1.5, 1.6**

- [x] 6.3 Write property test for theme application
  - **Property 3: Theme application is complete**
  - **Validates: Requirements 2.2**

- [x] 7. Update GeneratorForm component
  - Add audio settings controls (BGM selector, sound effects toggle)
  - Add custom font selectors (heading, body)
  - Add custom color pickers (background, text, links)
  - Integrate with Zustand store
  - Add form validation for required fields
  - _Requirements: 1.3, 1.4, 16.1, 16.2, 16.3, 16.4, 19.4, 19.5_

- [x] 7.1 Write property test for form validation
  - **Property 14: Form validation rejects invalid inputs**
  - **Validates: Requirements 16.1, 16.2, 16.3**

- [x] 7.2 Write property test for email validation
  - **Property 15: Email validation requires @ symbol**
  - **Validates: Requirements 16.4**

- [x] 8. Implement guest mode functionality
  - Allow unauthenticated access to generator interface
  - Enable preview and download without auth
  - Show "Sign in to save" prompt on save attempt
  - Show "Sign in to view gallery" on gallery access
  - Preserve work when user signs in
  - _Requirements: 23.1, 23.2, 23.3, 23.4, 23.5, 23.6, 23.7_

- [x] 9. Update site persistence with user association
  - Modify saveSite mutation to require userId
  - Associate saved sites with authenticated user
  - Initialize view count to zero
  - Return site ID for retrieval
  - Validate all required fields before saving
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [x] 9.1 Write property test for site persistence
  - **Property 6: Site persistence round-trip**
  - **Validates: Requirements 6.1, 6.2, 6.4, 6.6**

- [x] 9.2 Write property test for initial view count
  - **Property 7: New sites initialize with zero views**
  - **Validates: Requirements 6.3**

- [x] 9.3 Write property test for required fields
  - **Property 8: Required fields are enforced**
  - **Validates: Requirements 6.5**

- [x] 10. Implement private gallery with user filtering
  - Create getUserSites query filtered by userId
  - Update gallery page to show only user's sites
  - Redirect unauthenticated users to sign-in
  - Display empty state for users with no sites
  - Show site metadata (name, theme, views, guestbook count)
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

- [x] 11. Implement site editing functionality
  - Add edit button on site pages (owner only)
  - Create edit mode UI with populated form
  - Allow modification of all configuration fields
  - Implement updateSite mutation
  - Preserve createdAt and views on update
  - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6, 19.7, 19.8, 19.9, 19.10_

- [x] 11.1 Write property test for edit preservation
  - **Property 16: Edit preserves metadata**
  - **Validates: Requirements 19.9, 19.10**

- [x] 12. Implement visitor tracking
  - Create incrementViews mutation
  - Call on site page load
  - Display view count in gallery
  - Persist updated count to database
  - _Requirements: 9.1, 9.2, 9.3_

- [x] 12.1 Write property test for view counting
  - **Property 9: View count increments correctly**
  - **Validates: Requirements 9.1, 9.2**

- [x] 13. Enhance guestbook with validation
  - Add length validation (name 1-50, message 1-500)
  - Validate in signGuestbook mutation
  - Display validation errors in UI
  - Store all fields (siteId, name, message, email, website, timestamp)
  - _Requirements: 10.2, 10.3, 10.4, 10.5, 10.6_

- [x] 13.1 Write property test for guestbook validation
  - **Property 10: Guestbook validation enforces length limits**
  - **Validates: Requirements 10.5, 10.6**

- [x] 13.2 Write property test for guestbook persistence
  - **Property 11: Guestbook entries persist completely**
  - **Validates: Requirements 10.4**

- [x] 14. Implement download functionality
  - Generate complete HTML on download button click
  - Create self-contained file with embedded assets
  - Trigger browser download with site name as filename
  - Ensure downloaded site works standalone
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [x] 14.1 Write property test for download
  - **Property 12: Downloaded sites are self-contained**
  - **Validates: Requirements 11.1, 11.4**

- [x] 15. Implement iframe popup suppression
  - Add window.self === window.top check
  - Suppress popups when in iframe
  - Allow popups in standalone/downloaded sites
  - _Requirements: 5.4, 5.5, 12.3_

- [x] 15.1 Write property test for iframe detection
  - **Property 13: Iframe context suppresses popups**
  - **Validates: Requirements 12.3**

- [x] 16. Implement responsive layouts
  - Make generator form responsive (side-by-side on desktop, stacked on mobile)
  - Make gallery grid responsive
  - Make site page responsive (preview + guestbook layout)
  - Test on multiple screen sizes
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

- [x] 17. Add error handling and validation
  - Implement client-side form validation with error messages
  - Add network error handling with toast notifications
  - Implement server-side validation in mutations
  - Add error boundaries for React errors
  - Handle authentication errors gracefully
  - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5_

- [x] 18. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 19. Deploy to Vercel
  - Connect GitHub repository to Vercel
  - Configure environment variables (Clerk, Convex)
  - Set up automatic deployments on push
  - Deploy Convex to production
  - Test production deployment
  - _Requirements: 22.1, 22.2, 22.3, 22.4, 22.5, 22.6, 22.7_

- [x] 20. Final testing and polish
  - Test all user flows end-to-end
  - Verify guest mode works correctly
  - Test authentication flow
  - Verify site generation with all feature combinations
  - Test guestbook functionality
  - Verify download works
  - Test on multiple browsers (Chrome, Firefox, Safari, Edge)
  - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5_

- [x] 21. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 22. Add email/password authentication support
  - Verify Clerk is configured for email/password authentication
  - Update sign-in UI to show both GitHub and email/password options
  - Test email/password sign-in flow
  - Test email/password sign-up flow
  - Verify user sessions work correctly with email/password
  - Update documentation with email/password testing instructions
  - _Requirements: 21.3, 21.4, 21.11, 21.12_

---

## Notes

- **Property Tests**: Each property test should run a minimum of 100 iterations and include the tag format: `**Feature: 90s-website-generator, Property N: [property text]**`
- **Testing Library**: Use fast-check for property-based testing
- **Incremental Development**: Each task builds on previous tasks. Complete tasks in order for best results.
- **Checkpoints**: Pause at checkpoints to ensure all tests pass before continuing.
- **Comprehensive Testing**: All tests are required to ensure correctness from the start.
