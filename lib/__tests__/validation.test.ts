import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { validateSiteConfig, validateEmail } from '../validation';

describe('Form Validation', () => {
  describe('Property-Based Tests', () => {
    // **Feature: 90s-website-generator, Property 14: Form validation rejects invalid inputs**
    it('Property 14: Form validation rejects invalid inputs', () => {
      fc.assert(
        fc.property(
          fc.record({
            name: fc.constantFrom('', '   ', '\t\n'),
            hobby: fc.string(),
            theme: fc.string(),
          }),
          (config) => {
            const result = validateSiteConfig(config);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Name is required');
          }
        ),
        { numRuns: 100 }
      );

      fc.assert(
        fc.property(
          fc.record({
            name: fc.string({ minLength: 1 }),
            hobby: fc.constantFrom('', '   ', '\t\n'),
            theme: fc.string(),
          }),
          (config) => {
            const result = validateSiteConfig(config);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Hobby is required');
          }
        ),
        { numRuns: 100 }
      );

      fc.assert(
        fc.property(
          fc.record({
            name: fc.string({ minLength: 1 }),
            hobby: fc.string({ minLength: 1 }),
            theme: fc.constant(''),
          }),
          (config) => {
            const result = validateSiteConfig(config);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Theme is required');
          }
        ),
        { numRuns: 100 }
      );
    });

    // **Feature: 90s-website-generator, Property 15: Email validation requires @ symbol**
    it('Property 15: Email validation requires @ symbol', () => {
      // Test that emails WITH @ symbol pass validation
      fc.assert(
        fc.property(
          fc.string({ minLength: 1 }),
          fc.string({ minLength: 1 }),
          (localPart, domain) => {
            const email = `${localPart}@${domain}`;
            expect(validateEmail(email)).toBe(true);
          }
        ),
        { numRuns: 100 }
      );

      // Test that strings WITHOUT @ symbol fail validation
      fc.assert(
        fc.property(
          fc.string().filter(s => !s.includes('@')),
          (invalidEmail) => {
            expect(validateEmail(invalidEmail)).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Unit Tests', () => {
    describe('validateSiteConfig', () => {
      it('accepts valid configuration', () => {
        const config = {
          name: 'John Doe',
          hobby: 'Coding',
          theme: 'neon',
        };
        const result = validateSiteConfig(config);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('rejects empty name', () => {
        const config = {
          name: '',
          hobby: 'Coding',
          theme: 'neon',
        };
        const result = validateSiteConfig(config);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Name is required');
      });

      it('rejects whitespace-only name', () => {
        const config = {
          name: '   ',
          hobby: 'Coding',
          theme: 'neon',
        };
        const result = validateSiteConfig(config);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Name is required');
      });

      it('rejects empty hobby', () => {
        const config = {
          name: 'John Doe',
          hobby: '',
          theme: 'neon',
        };
        const result = validateSiteConfig(config);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Hobby is required');
      });

      it('rejects missing theme', () => {
        const config = {
          name: 'John Doe',
          hobby: 'Coding',
          theme: '',
        };
        const result = validateSiteConfig(config);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Theme is required');
      });

      it('returns multiple errors for multiple invalid fields', () => {
        const config = {
          name: '',
          hobby: '',
          theme: '',
        };
        const result = validateSiteConfig(config);
        expect(result.isValid).toBe(false);
        expect(result.errors).toHaveLength(3);
      });
    });

    describe('validateEmail', () => {
      it('accepts email with @ symbol', () => {
        expect(validateEmail('user@example.com')).toBe(true);
        expect(validateEmail('test@test')).toBe(true);
        expect(validateEmail('@')).toBe(true);
      });

      it('rejects email without @ symbol', () => {
        expect(validateEmail('userexample.com')).toBe(false);
        expect(validateEmail('test')).toBe(false);
        expect(validateEmail('')).toBe(false);
      });
    });
  });
});
