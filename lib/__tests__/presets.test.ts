import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { presets } from '../presets';

describe('Template Presets', () => {
  describe('Property-Based Tests', () => {
    // **Feature: 90s-website-generator, Property 5: Presets demonstrate feature diversity**
    it('Property 5: Presets demonstrate feature diversity', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...presets),
          fc.constantFrom(...presets),
          (preset1, preset2) => {
            // If we pick two different presets, they should have some differences
            if (preset1.id === preset2.id) {
              // Same preset, skip comparison
              return true;
            }
            
            const config1 = preset1.config;
            const config2 = preset2.config;
            
            // Count differences in feature toggles
            const toggleDifferences = [
              config1.addMusic !== config2.addMusic,
              config1.addCursor !== config2.addCursor,
              config1.addGifs !== config2.addGifs,
              config1.addPopups !== config2.addPopups,
              config1.addRainbowText !== config2.addRainbowText,
              config1.soundEffects !== config2.soundEffects,
            ].filter(Boolean).length;
            
            // Count differences in audio settings
            const audioDifferences = [
              config1.bgmTrack !== config2.bgmTrack,
            ].filter(Boolean).length;
            
            // Count differences in customization
            const customizationDifferences = [
              JSON.stringify(config1.customFonts) !== JSON.stringify(config2.customFonts),
              JSON.stringify(config1.customColors) !== JSON.stringify(config2.customColors),
            ].filter(Boolean).length;
            
            // Different presets should differ in theme OR have at least 2 differences total
            const themeDifferent = config1.theme !== config2.theme;
            const totalDifferences = toggleDifferences + audioDifferences + customizationDifferences;
            
            return themeDifferent || totalDifferences >= 2;
          }
        ),
        { numRuns: 100 }
      );
    });
  });
  
  describe('Unit Tests', () => {
    describe('Preset structure', () => {
      it('should have exactly 6 presets', () => {
        expect(presets).toHaveLength(6);
      });
      
      it('should have unique IDs', () => {
        const ids = presets.map(p => p.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(presets.length);
      });
      
      it('should have unique themes across presets', () => {
        const themes = presets.map(p => p.config.theme);
        const uniqueThemes = new Set(themes);
        // We should have at least 4 different themes
        expect(uniqueThemes.size).toBeGreaterThanOrEqual(4);
      });
    });
    
    describe('Audio features', () => {
      it('should have at least 3 presets with BGM tracks', () => {
        const presetsWithBGM = presets.filter(p => p.config.bgmTrack);
        expect(presetsWithBGM.length).toBeGreaterThanOrEqual(3);
      });
      
      it('should have at least 2 presets with sound effects', () => {
        const presetsWithSoundEffects = presets.filter(p => p.config.soundEffects);
        expect(presetsWithSoundEffects.length).toBeGreaterThanOrEqual(2);
      });
      
      it('should have at least 1 preset without audio', () => {
        const presetsWithoutAudio = presets.filter(
          p => !p.config.bgmTrack && !p.config.soundEffects && !p.config.addMusic
        );
        expect(presetsWithoutAudio.length).toBeGreaterThanOrEqual(1);
      });
    });
    
    describe('Customization features', () => {
      it('should have at least 2 presets with custom fonts', () => {
        const presetsWithCustomFonts = presets.filter(p => p.config.customFonts);
        expect(presetsWithCustomFonts.length).toBeGreaterThanOrEqual(2);
      });
      
      it('should have at least 2 presets with custom colors', () => {
        const presetsWithCustomColors = presets.filter(p => p.config.customColors);
        expect(presetsWithCustomColors.length).toBeGreaterThanOrEqual(2);
      });
    });
    
    describe('Feature toggle diversity', () => {
      it('should have presets with all features enabled', () => {
        const allFeaturesPreset = presets.find(p => 
          p.config.addMusic &&
          p.config.addCursor &&
          p.config.addGifs &&
          p.config.addPopups &&
          p.config.addRainbowText
        );
        expect(allFeaturesPreset).toBeDefined();
      });
      
      it('should have presets with minimal features', () => {
        const minimalPreset = presets.find(p => 
          !p.config.addMusic &&
          !p.config.addCursor &&
          !p.config.addGifs &&
          !p.config.addPopups &&
          !p.config.addRainbowText
        );
        expect(minimalPreset).toBeDefined();
      });
      
      it('should have varied feature combinations', () => {
        // Count how many presets have each feature enabled
        const musicCount = presets.filter(p => p.config.addMusic).length;
        const cursorCount = presets.filter(p => p.config.addCursor).length;
        const gifsCount = presets.filter(p => p.config.addGifs).length;
        const popupsCount = presets.filter(p => p.config.addPopups).length;
        const rainbowCount = presets.filter(p => p.config.addRainbowText).length;
        
        // Each feature should be enabled in 2-5 presets (not all or none)
        expect(musicCount).toBeGreaterThanOrEqual(2);
        expect(musicCount).toBeLessThanOrEqual(5);
        expect(cursorCount).toBeGreaterThanOrEqual(2);
        expect(cursorCount).toBeLessThanOrEqual(5);
        expect(gifsCount).toBeGreaterThanOrEqual(2);
        expect(gifsCount).toBeLessThanOrEqual(5);
        expect(popupsCount).toBeGreaterThanOrEqual(2);
        expect(popupsCount).toBeLessThanOrEqual(5);
        expect(rainbowCount).toBeGreaterThanOrEqual(2);
        expect(rainbowCount).toBeLessThanOrEqual(5);
      });
    });
  });
});
