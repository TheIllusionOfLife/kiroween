/**
 * Shared validation logic for site configuration
 * Used by Convex mutations to ensure data integrity
 */

export interface SiteConfigValidation {
  userId?: string;
  name?: string;
  hobby?: string;
  theme?: string;
  [key: string]: any;
}

/**
 * Validates site configuration fields
 * Throws descriptive errors for invalid configurations
 * 
 * @param config - Site configuration to validate
 * @throws Error if validation fails
 */
export function validateSiteConfig(config: SiteConfigValidation): void {
  if (!config.userId || config.userId.length === 0) {
    throw new Error("User ID is required");
  }
  if (!config.name || config.name.length === 0) {
    throw new Error("Name is required");
  }
  if (!config.hobby || config.hobby.length === 0) {
    throw new Error("Hobby is required");
  }
  if (!config.theme || config.theme.length === 0) {
    throw new Error("Theme is required");
  }
}
