import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "react-hooks/exhaustive-deps": "off", // Disable React hooks dependency rule
      "@typescript-eslint/no-explicit-any": "off", // Allow 'any' type in TypeScript
      "react/no-unescaped-entities": "off", // Disable unescaped entity warnings
      "@typescript-eslint/no-unused-vars": "off", // Warn on unused variables instead of error
      "@typescript-eslint/no-unused-expressions": "off", // Warn on unused expressions instead of error
    }
  }
];

export default eslintConfig;
