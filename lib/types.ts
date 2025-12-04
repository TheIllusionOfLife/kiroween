/**
 * Shared type definitions for the 90s Website Generator
 */

export interface SiteConfig {
  // Basic info
  name: string;
  hobby: string;
  email?: string;
  theme: string;
  
  // Feature toggles
  addMusic: boolean;
  addCursor: boolean;
  addGifs: boolean;
  addPopups: boolean;
  addRainbowText: boolean;
  
  // Audio settings
  bgmTrack?: string;
  soundEffects: boolean;
  
  // Customization (for edit mode)
  customFonts?: {
    heading?: string;
    body?: string;
  };
  customColors?: {
    background?: string;
    text?: string;
    links?: string;
  };
  
  // Metadata (from database)
  createdAt?: number;
}
