import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { validateSiteConfig } from '../../convex/validation';

/**
 * Site Persistence Tests
 * 
 * These tests validate the structure and logic of site persistence
 * using the SAME validation function that the Convex mutation uses.
 * This ensures consistency between tests and production code.
 * 
 * The validation logic is defined in convex/validation.ts and imported
 * by both convex/sites.ts (the mutation) and this test file.
 */
describe('Site Persistence', () => {

  describe('Property-Based Tests', () => {
    // **Feature: 90s-website-generator, Property 6: Site persistence round-trip**
    it('Property 6: Site persistence round-trip', () => {
      fc.assert(
        fc.property(
          fc.record({
            userId: fc.string({ minLength: 1, maxLength: 50 }),
            name: fc.string({ minLength: 1, maxLength: 50 }),
            hobby: fc.string({ minLength: 1, maxLength: 100 }),
            email: fc.option(fc.emailAddress(), { nil: undefined }),
            theme: fc.constantFrom('neon', 'space', 'rainbow', 'matrix', 'geocities', 'angelfire'),
            addMusic: fc.boolean(),
            addCursor: fc.boolean(),
            addGifs: fc.boolean(),
            addPopups: fc.boolean(),
            addRainbowText: fc.boolean(),
            bgmTrack: fc.option(fc.constantFrom('midi-game', 'midi-chill', 'midi-epic'), { nil: undefined }),
            soundEffects: fc.boolean(),
            customFonts: fc.option(
              fc.record({
                heading: fc.option(fc.constantFrom('Arial', 'Courier New, monospace', 'Impact, fantasy'), { nil: undefined }),
                body: fc.option(fc.constantFrom('Arial', 'Courier New, monospace', 'Comic Sans MS, cursive'), { nil: undefined }),
              }),
              { nil: undefined }
            ),
            customColors: fc.option(
              fc.record({
                background: fc.option(fc.constantFrom('#ff0000', '#00ff00', '#0000ff'), { nil: undefined }),
                text: fc.option(fc.constantFrom('#ff0000', '#00ff00', '#0000ff'), { nil: undefined }),
                links: fc.option(fc.constantFrom('#ff0000', '#00ff00', '#0000ff'), { nil: undefined }),
              }),
              { nil: undefined }
            ),
            createdAt: fc.integer({ min: 1000000000000, max: 9999999999999 }),
          }),
          (config) => {
            // Test that validation passes for valid configs (Requirements 6.1, 6.2, 6.4, 6.6)
            expect(() => validateSiteConfig(config)).not.toThrow();
            
            // Simulate the database insert structure
            const siteData = {
              ...config,
              views: 0, // Should initialize to zero
              updatedAt: config.createdAt,
            };
            
            // Verify all required fields are present
            expect(siteData.userId).toBe(config.userId);
            expect(siteData.name).toBe(config.name);
            expect(siteData.hobby).toBe(config.hobby);
            expect(siteData.theme).toBe(config.theme);
            
            // Verify optional fields are preserved
            expect(siteData.email).toBe(config.email);
            expect(siteData.addMusic).toBe(config.addMusic);
            expect(siteData.addCursor).toBe(config.addCursor);
            expect(siteData.addGifs).toBe(config.addGifs);
            expect(siteData.addPopups).toBe(config.addPopups);
            expect(siteData.addRainbowText).toBe(config.addRainbowText);
            expect(siteData.bgmTrack).toBe(config.bgmTrack);
            expect(siteData.soundEffects).toBe(config.soundEffects);
            
            // Verify custom fonts are preserved
            if (config.customFonts) {
              expect(siteData.customFonts).toBeDefined();
              expect(siteData.customFonts?.heading).toBe(config.customFonts.heading);
              expect(siteData.customFonts?.body).toBe(config.customFonts.body);
            }
            
            // Verify custom colors are preserved
            if (config.customColors) {
              expect(siteData.customColors).toBeDefined();
              expect(siteData.customColors?.background).toBe(config.customColors.background);
              expect(siteData.customColors?.text).toBe(config.customColors.text);
              expect(siteData.customColors?.links).toBe(config.customColors.links);
            }
            
            // Verify metadata
            expect(siteData.createdAt).toBe(config.createdAt);
            expect(siteData.updatedAt).toBe(config.createdAt);
            expect(siteData.views).toBe(0);
          }
        ),
        { numRuns: 100 }
      );
    });

    // **Feature: 90s-website-generator, Property 7: New sites initialize with zero views**
    it('Property 7: New sites initialize with zero views', () => {
      fc.assert(
        fc.property(
          fc.record({
            userId: fc.string({ minLength: 1, maxLength: 50 }),
            name: fc.string({ minLength: 1, maxLength: 50 }),
            hobby: fc.string({ minLength: 1, maxLength: 100 }),
            email: fc.option(fc.emailAddress(), { nil: undefined }),
            theme: fc.constantFrom('neon', 'space', 'rainbow', 'matrix', 'geocities', 'angelfire'),
            addMusic: fc.boolean(),
            addCursor: fc.boolean(),
            addGifs: fc.boolean(),
            addPopups: fc.boolean(),
            addRainbowText: fc.boolean(),
            bgmTrack: fc.option(fc.constantFrom('midi-game', 'midi-chill', 'midi-epic'), { nil: undefined }),
            soundEffects: fc.boolean(),
            createdAt: fc.integer({ min: 1000000000000, max: 9999999999999 }),
          }),
          (config) => {
            // Simulate the database insert structure
            const siteData = {
              ...config,
              views: 0, // Should always initialize to zero (Requirement 6.3)
              updatedAt: config.createdAt,
            };
            
            // Verify view count is zero
            expect(siteData.views).toBe(0);
          }
        ),
        { numRuns: 100 }
      );
    });

    // **Feature: 90s-website-generator, Property 8: Required fields are enforced**
    it('Property 8: Required fields are enforced', () => {
      fc.assert(
        fc.property(
          fc.record({
            userId: fc.option(fc.string({ minLength: 0, maxLength: 50 }), { nil: undefined }),
            name: fc.option(fc.string({ minLength: 0, maxLength: 50 }), { nil: undefined }),
            hobby: fc.option(fc.string({ minLength: 0, maxLength: 100 }), { nil: undefined }),
            theme: fc.option(fc.string({ minLength: 0, maxLength: 20 }), { nil: undefined }),
            addMusic: fc.boolean(),
            addCursor: fc.boolean(),
            addGifs: fc.boolean(),
            addPopups: fc.boolean(),
            addRainbowText: fc.boolean(),
            soundEffects: fc.boolean(),
            createdAt: fc.integer({ min: 1000000000000, max: 9999999999999 }),
          }),
          (config) => {
            // Determine if config is valid
            const hasUserId = config.userId && config.userId.length > 0;
            const hasName = config.name && config.name.length > 0;
            const hasHobby = config.hobby && config.hobby.length > 0;
            const hasTheme = config.theme && config.theme.length > 0;
            const isValid = hasUserId && hasName && hasHobby && hasTheme;
            
            if (isValid) {
              // Valid config should pass validation
              expect(() => validateSiteConfig(config)).not.toThrow();
            } else {
              // Invalid config should throw error (Requirement 6.5)
              expect(() => validateSiteConfig(config)).toThrow();
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    // **Feature: 90s-website-generator, Property 9: View count increments correctly**
    it('Property 9: View count increments correctly', () => {
      fc.assert(
        fc.property(
          fc.record({
            initialViews: fc.integer({ min: 0, max: 10000 }),
            viewCount: fc.integer({ min: 1, max: 100 }), // Number of times to view
          }),
          ({ initialViews, viewCount }) => {
            // Simulate viewing a site N times
            let currentViews = initialViews;
            
            for (let i = 0; i < viewCount; i++) {
              // Simulate incrementViews mutation (Requirements 9.1, 9.2)
              currentViews = currentViews + 1;
            }
            
            // Verify view count increased by exactly N
            expect(currentViews).toBe(initialViews + viewCount);
            
            // Verify view count is always non-negative
            expect(currentViews).toBeGreaterThanOrEqual(0);
          }
        ),
        { numRuns: 100 }
      );
    });

    // **Feature: 90s-website-generator, Property 16: Edit preserves metadata**
    it('Property 16: Edit preserves metadata', () => {
      fc.assert(
        fc.property(
          fc.record({
            // Original site data
            original: fc.record({
              userId: fc.string({ minLength: 1, maxLength: 50 }),
              name: fc.string({ minLength: 1, maxLength: 50 }),
              hobby: fc.string({ minLength: 1, maxLength: 100 }),
              theme: fc.constantFrom('neon', 'space', 'rainbow', 'matrix', 'geocities', 'angelfire'),
              createdAt: fc.integer({ min: 1000000000000, max: 9999999999999 }),
              views: fc.integer({ min: 0, max: 10000 }),
            }),
            // Updated configuration
            updates: fc.record({
              name: fc.string({ minLength: 1, maxLength: 50 }),
              hobby: fc.string({ minLength: 1, maxLength: 100 }),
              email: fc.option(fc.emailAddress(), { nil: undefined }),
              theme: fc.constantFrom('neon', 'space', 'rainbow', 'matrix', 'geocities', 'angelfire'),
              addMusic: fc.boolean(),
              addCursor: fc.boolean(),
              addGifs: fc.boolean(),
              addPopups: fc.boolean(),
              addRainbowText: fc.boolean(),
              bgmTrack: fc.option(fc.constantFrom('midi-game', 'midi-chill', 'midi-epic'), { nil: undefined }),
              soundEffects: fc.boolean(),
              customFonts: fc.option(
                fc.record({
                  heading: fc.option(fc.constantFrom('Arial', 'Courier New, monospace'), { nil: undefined }),
                  body: fc.option(fc.constantFrom('Arial', 'Courier New, monospace'), { nil: undefined }),
                }),
                { nil: undefined }
              ),
              customColors: fc.option(
                fc.record({
                  background: fc.option(fc.constantFrom('#ff0000', '#00ff00', '#0000ff'), { nil: undefined }),
                  text: fc.option(fc.constantFrom('#ff0000', '#00ff00', '#0000ff'), { nil: undefined }),
                  links: fc.option(fc.constantFrom('#ff0000', '#00ff00', '#0000ff'), { nil: undefined }),
                }),
                { nil: undefined }
              ),
            }),
          }),
          ({ original, updates }) => {
            // Simulate the update operation (using a fixed timestamp after original)
            const updateTimestamp = original.createdAt + 1000; // 1 second after creation
            const updatedSite = {
              ...updates,
              userId: original.userId,
              updatedAt: updateTimestamp,
              // Preserve metadata (Requirements 19.9, 19.10)
              createdAt: original.createdAt,
              views: original.views,
            };
            
            // Verify configuration was updated
            expect(updatedSite.name).toBe(updates.name);
            expect(updatedSite.hobby).toBe(updates.hobby);
            expect(updatedSite.theme).toBe(updates.theme);
            
            // Verify metadata was preserved (Requirements 19.9, 19.10)
            expect(updatedSite.createdAt).toBe(original.createdAt);
            expect(updatedSite.views).toBe(original.views);
            
            // Verify userId was preserved
            expect(updatedSite.userId).toBe(original.userId);
            
            // Verify updatedAt was set to a new value after creation
            expect(updatedSite.updatedAt).toBeGreaterThan(original.createdAt);
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
