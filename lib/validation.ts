import type { SiteConfig } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validates required fields for site configuration
 * @param config - Site configuration to validate
 * @returns Validation result with errors if any
 */
export function validateSiteConfig(config: Partial<SiteConfig>): ValidationResult {
  const errors: string[] = [];

  // Validate name (required, non-empty)
  if (!config.name || config.name.trim().length === 0) {
    errors.push('Name is required');
  }

  // Validate hobby (required, non-empty)
  if (!config.hobby || config.hobby.trim().length === 0) {
    errors.push('Hobby is required');
  }

  // Validate theme (required)
  if (!config.theme || config.theme.length === 0) {
    errors.push('Theme is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates email format
 * @param email - Email string to validate
 * @returns True if email contains @ symbol, false otherwise
 */
export function validateEmail(email: string): boolean {
  return email.includes('@');
}
