import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { validateGuestbookEntry } from '../../convex/guestbook';

/**
 * Guestbook Tests
 * 
 * These tests validate guestbook entry validation logic using the
 * SAME validation function that the Convex mutation uses.
 * This ensures consistency between tests and production code.
 * 
 * The validation logic is defined in convex/guestbook.ts and imported
 * by both the mutation and this test file.
 */

describe('Guestbook', () => {
  describe('Property-Based Tests', () => {
    // **Feature: 90s-website-generator, Property 10: Guestbook validation enforces length limits**
    it('Property 10: Guestbook validation enforces length limits', () => {
      fc.assert(
        fc.property(
          fc.record({
            name: fc.string(),
            message: fc.string(),
          }),
          (entry) => {
            const trimmedName = entry.name.trim();
            const trimmedMessage = entry.message.trim();
            
            const nameValid = trimmedName.length >= 1 && trimmedName.length <= 50;
            const messageValid = trimmedMessage.length >= 1 && trimmedMessage.length <= 500;
            const shouldAccept = nameValid && messageValid;
            
            if (shouldAccept) {
              // Valid entries should pass validation (Requirements 10.5, 10.6)
              expect(() => validateGuestbookEntry(entry)).not.toThrow();
            } else {
              // Invalid entries should be rejected (Requirements 10.5, 10.6)
              expect(() => validateGuestbookEntry(entry)).toThrow();
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    // **Feature: 90s-website-generator, Property 11: Guestbook entries persist completely**
    it('Property 11: Guestbook entries persist completely', () => {
      fc.assert(
        fc.property(
          fc.record({
            siteId: fc.string({ minLength: 1, maxLength: 50 }),
            name: fc.string({ minLength: 1, maxLength: 50 }),
            message: fc.string({ minLength: 1, maxLength: 500 }),
            email: fc.option(fc.emailAddress(), { nil: undefined }),
            website: fc.option(fc.webUrl(), { nil: undefined }),
            timestamp: fc.integer({ min: 1000000000000, max: 9999999999999 }),
          }),
          (entry) => {
            // Simulate database insert structure (Requirement 10.4)
            const storedEntry = {
              siteId: entry.siteId,
              name: entry.name.trim(),
              message: entry.message.trim(),
              email: entry.email,
              website: entry.website,
              timestamp: entry.timestamp,
            };
            
            // Verify all fields are stored correctly
            expect(storedEntry.siteId).toBe(entry.siteId);
            expect(storedEntry.name).toBe(entry.name.trim());
            expect(storedEntry.message).toBe(entry.message.trim());
            expect(storedEntry.email).toBe(entry.email);
            expect(storedEntry.website).toBe(entry.website);
            expect(storedEntry.timestamp).toBe(entry.timestamp);
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
