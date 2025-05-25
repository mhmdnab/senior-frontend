// eslint.config.js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// This block is needed for ESM modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Main ESLint config array
export default [
  // Next.js and TypeScript recommended settings
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Custom rules for your project (strict for deployment)
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error", // No use of 'any'
      "@typescript-eslint/no-unused-expressions": "error", // No unused expressions
      // You can add more custom rules here!
    },
  },
];
