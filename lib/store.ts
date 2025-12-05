import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useRef, useCallback, useEffect } from 'react';
import type { SiteConfig } from './types';
import type { Id } from '../convex/_generated/dataModel';

interface GeneratorState {
  // Form state
  config: SiteConfig;
  
  // UI state
  isEditMode: boolean;
  editingSiteId?: Id<"sites">;
  previewHtml: string;
  isGenerating: boolean;
  
  // Actions
  updateConfig: (updates: Partial<SiteConfig>) => void;
  setConfig: (config: SiteConfig) => void;
  resetConfig: () => void;
  setPreviewHtml: (html: string) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  enterEditMode: (siteId: Id<"sites">, config: SiteConfig) => void;
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
export function useDebouncedPreview(
  generateFn: (config: SiteConfig) => string,
  delay: number = 500
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const updatePreview = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    useGeneratorStore.getState().setIsGenerating(true);
    
    timeoutRef.current = setTimeout(() => {
      // Get the latest config from the store at execution time
      const latestConfig = useGeneratorStore.getState().config;
      const html = generateFn(latestConfig);
      useGeneratorStore.getState().setPreviewHtml(html);
      useGeneratorStore.getState().setIsGenerating(false);
    }, delay);
  }, [generateFn, delay]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);
  
  return updatePreview;
}
