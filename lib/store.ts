import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
}

interface GeneratorState {
  // Form state
  config: SiteConfig;
  
  // UI state
  isEditMode: boolean;
  editingSiteId?: string;
  previewHtml: string;
  isGenerating: boolean;
  
  // Actions
  updateConfig: (updates: Partial<SiteConfig>) => void;
  setConfig: (config: SiteConfig) => void;
  resetConfig: () => void;
  setPreviewHtml: (html: string) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  enterEditMode: (siteId: string, config: SiteConfig) => void;
  exitEditMode: () => void;
}

const defaultConfig: SiteConfig = {
  name: '',
  hobby: '',
  email: '',
  theme: 'neon',
  addMusic: false,
  addCursor: false,
  addGifs: false,
  addPopups: false,
  addRainbowText: false,
  soundEffects: false,
};

export const useGeneratorStore = create<GeneratorState>()(
  persist(
    (set) => ({
      // Initial state
      config: defaultConfig,
      isEditMode: false,
      editingSiteId: undefined,
      previewHtml: '',
      isGenerating: false,
      
      // Actions
      updateConfig: (updates) =>
        set((state) => ({
          config: { ...state.config, ...updates },
        })),
      
      setConfig: (config) =>
        set({ config }),
      
      resetConfig: () =>
        set({ 
          config: defaultConfig,
          isEditMode: false,
          editingSiteId: undefined,
        }),
      
      setPreviewHtml: (html) =>
        set({ previewHtml: html }),
      
      setIsGenerating: (isGenerating) =>
        set({ isGenerating }),
      
      enterEditMode: (siteId, config) =>
        set({
          isEditMode: true,
          editingSiteId: siteId,
          config,
        }),
      
      exitEditMode: () =>
        set({
          isEditMode: false,
          editingSiteId: undefined,
          config: defaultConfig,
        }),
    }),
    {
      name: 'generator-storage',
      partialize: (state) => ({ config: state.config }),
    }
  )
);

// Debounced preview update hook
let previewTimeout: NodeJS.Timeout | null = null;

export function useDebouncedPreview(
  generateFn: (config: SiteConfig) => string,
  delay: number = 500
) {
  const { config, setPreviewHtml, setIsGenerating } = useGeneratorStore();
  
  const updatePreview = () => {
    if (previewTimeout) {
      clearTimeout(previewTimeout);
    }
    
    setIsGenerating(true);
    
    previewTimeout = setTimeout(() => {
      const html = generateFn(config);
      setPreviewHtml(html);
      setIsGenerating(false);
    }, delay);
  };
  
  return updatePreview;
}
