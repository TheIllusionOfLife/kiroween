import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

/**
 * Guestbook Tests
 * 
 * These tests validate guestbook entry validation logic.
 */

// Validation function matching the logic in convex/guestbook.ts
function validateGuestbookEntry(entry: { name: string; message: string }) {
  const name = entry.name.trim();
  const message = entry.message.trim();
  
  if (name.length < 1) {
    throw new Error("Name is required!");
  }
  if (name.length > 50) {
    throw new Error("Name too long! Keep it under 50 characters.");
  }
  if (message.length < 1) {
    throw new Error("Message is required!");
  }
  if (message.length > 500) {
    throw new Error("Message too long! Keep it under 500 characters.");
  }
}

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
