import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated files
    "convex/_generated/**",
    "**/_generated/**",
    // Frozen reference code (vibe_coding is frozen - don't lint)
    "vibe_coding/**",
    // Dependencies
    "node_modules/**",
    // Test coverage
    "coverage/**",
  ]),
]);

export default eslintConfig;
