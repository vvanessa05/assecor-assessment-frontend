import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "**/dist",
      "**/node_modules",
      "**/vite.config.*",
    ],
  },
  {files: ["**/*.ts"],
 languageOptions: {
      parserOptions: {
        project: null,
        program: null,
      },
    },
  },
  tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      semi: "warn",
      "prefer-const": "error",
      "no-console": "warn",
      quotes: ["warn", "double"],
      "no-warning-comments": [
        "warn",
        {
          "terms": ["todo", "fixme"],
          "location": "start"
        }
      ],
      "id-length": [
        "warn",
        {
          "min": 3,
          "exceptions": ["i", "j", "x", "y", "id"],
          "properties": "never"
        }
      ]
    },
  },
]);
