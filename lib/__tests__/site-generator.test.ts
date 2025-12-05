import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { generateSiteHTML } from '../site-generator';
import type { SiteConfig } from '../types';

describe('Site Generator', () => {
  describe('Property-Based Tests', () => {
    // **Feature: 90s-website-generator, Property 1: Site generation incorporates all configuration**
    it('Property 1: Site generation incorporates all configuration', () => {
      fc.assert(
        fc.property(
          fc.record({
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
                background: fc.option(fc.constantFrom('#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#000000', '#ffffff'), { nil: undefined }),
                text: fc.option(fc.constantFrom('#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#000000', '#ffffff'), { nil: undefined }),
                links: fc.option(fc.constantFrom('#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#000000', '#ffffff'), { nil: undefined }),
              }),
              { nil: undefined }
            ),
          }),
          (config: SiteConfig) => {
            const html = generateSiteHTML(config);
            
            // Helper function to escape HTML
            const escapeHtml = (str: string) => str
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
            
            // Verify name is included (HTML-escaped)
            const escapedName = escapeHtml(config.name);
            expect(html).toContain(escapedName);
            
            // Verify hobby is included (HTML-escaped)
            const escapedHobby = escapeHtml(config.hobby);
            expect(html).toContain(escapedHobby);
            
            // Verify email is included if provided (HTML-escaped)
            if (config.email) {
              const escapedEmail = escapeHtml(config.email);
              expect(html).toContain(escapedEmail);
            }
            
            // Verify BGM is included if configured
            if (config.bgmTrack) {
              expect(html).toContain('BGM Player');
              expect(html).toContain('audio');
            }
            
            // Verify sound effects are included if configured
            if (config.soundEffects) {
              expect(html).toContain('playSound');
            }
            
            // Verify custom fonts are applied if provided
            if (config.customFonts?.heading) {
              expect(html).toContain(config.customFonts.heading);
            }
            if (config.customFonts?.body) {
              expect(html).toContain(config.customFonts.body);
            }
            
            // Verify custom colors are applied if provided
            if (config.customColors?.background) {
              expect(html).toContain(config.customColors.background);
            }
            if (config.customColors?.text) {
              expect(html).toContain(config.customColors.text);
            }
            if (config.customColors?.links) {
              expect(html).toContain(config.customColors.links);
            }
          }
        ),
        { numRuns: 100 }
      );
    });
    
    // **Feature: 90s-website-generator, Property 2: Generated HTML is valid and self-contained**
    it('Property 2: Generated HTML is valid and self-contained', () => {
      fc.assert(
        fc.property(
          fc.record({
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
          }),
          (config: SiteConfig) => {
            const html = generateSiteHTML(config);
            
            // Verify HTML5 doctype
            expect(html).toContain('<!DOCTYPE html>');
            
            // Verify complete HTML structure
            expect(html).toContain('<html>');
            expect(html).toContain('</html>');
            expect(html).toContain('<head>');
            expect(html).toContain('</head>');
            expect(html).toContain('<body>');
            expect(html).toContain('</body>');
            
            // Verify meta charset
            expect(html).toContain('<meta charset="UTF-8">');
            
            // Verify title tag
            expect(html).toContain('<title>');
            expect(html).toContain('</title>');
            
            // Verify inline styles (self-contained)
            expect(html).toContain('<style>');
            expect(html).toContain('</style>');
            
            // Verify inline scripts (self-contained)
            expect(html).toContain('<script>');
            expect(html).toContain('</script>');
            
            // Verify no external CSS links
            expect(html).not.toContain('<link rel="stylesheet"');
            
            // Verify no external script sources (except audio URLs which are allowed)
            const scriptMatches = html.match(/<script[^>]*src=/g);
            expect(scriptMatches).toBeNull();
          }
        ),
        { numRuns: 100 }
      );
    });
    
    // **Feature: 90s-website-generator, Property 3: Theme application is complete**
    it('Property 3: Theme application is complete', () => {
      fc.assert(
        fc.property(
          fc.record({
            name: fc.string({ minLength: 1, maxLength: 50 }),
            hobby: fc.string({ minLength: 1, maxLength: 100 }),
            theme: fc.constantFrom('neon', 'space', 'rainbow', 'matrix', 'geocities', 'angelfire'),
            addMusic: fc.boolean(),
            addCursor: fc.boolean(),
            addGifs: fc.boolean(),
            addPopups: fc.boolean(),
            addRainbowText: fc.boolean(),
            soundEffects: fc.boolean(),
          }),
          (config: SiteConfig) => {
            const html = generateSiteHTML(config);
            
            // Verify theme-specific styling is present
            // All themes should have background color
            expect(html).toMatch(/background:\s*[#\w]+/);
            
            // All themes should have text color
            expect(html).toMatch(/color:\s*[#\w]+/);
            
            // Verify CSS animations are included
            expect(html).toContain('@keyframes');
            
            // Verify theme-specific elements based on theme
            if (config.theme === 'space') {
              // Space theme should have starfield or space-related styling
              expect(html).toContain('background');
            }
            
            // Verify consistent styling throughout
            expect(html).toContain('font-family');
            
            // Verify link colors are applied
            expect(html).toMatch(/a\s*{[^}]*color:/);
          }
        ),
        { numRuns: 100 }
      );
    });
    
    // **Feature: 90s-website-generator, Property 4: Audio features are included when configured**
    it('Property 4: Audio features are included when configured', () => {
    fc.assert(
      fc.property(
        fc.record({
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
        }),
        (config: SiteConfig) => {
          const html = generateSiteHTML(config);
          
          // Verify BGM audio element is included when bgmTrack is set
          if (config.bgmTrack) {
            expect(html).toContain('bgm-player');
            expect(html).toContain('<audio');
            expect(html).toContain('controls');
            expect(html).toContain('loop');
          }
          
          // Verify sound effects script is included when soundEffects is true
          if (config.soundEffects) {
            expect(html).toContain('playSound');
            expect(html).toContain('AudioContext');
            expect(html).toContain('oscillator');
          }
          
          // Verify old music indicator is shown when addMusic is true but no bgmTrack
          if (config.addMusic && !config.bgmTrack) {
            expect(html).toContain('MIDI Music Playing!');
          }
        }
      ),
      { numRuns: 100 }
    );
  });
  });
});
