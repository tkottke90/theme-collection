import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config(
  {
    ignores: [
      "**/dist/**",
      "**/storybook-static/**",
      "**/_site/**",
      "**/node_modules/**",
      "**/coverage/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    // React/Preact JSX packages only.
    files: ["packages/*-react/**/*.{ts,tsx}", "**/*.tsx"],
    plugins: { react: reactPlugin },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
    settings: { react: { version: "detect" } },
  },
  {
    files: ["**/*.stories.{ts,tsx}", "**/.storybook/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    // Shared config files are intentionally CommonJS (.cjs) so Jest can
    // load them without ESM gymnastics.
    files: ["**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  eslintConfigPrettier,
);
