import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import next from "eslint-config-next";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsparser,
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn", // Change 'error' → 'warn'
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // Ignore unused vars with `_`
      "react/no-unescaped-entities": "off", // Fix JSX escaping issues
      "react/react-in-jsx-scope": "off", // Next.js doesn't need 'import React'
      "prettier/prettier": "error", // Format code using Prettier
    },
  },
  next,
  prettier,
];
