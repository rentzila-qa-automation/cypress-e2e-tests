import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginCypress from 'eslint-plugin-cypress';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  { ignores: ['node_modules/', 'cypress/screenshots/', 'cypress/videos/', 'cypress/downloads/', 'cypress/reports/'] },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['cypress/**/*.ts'],
    extends: [pluginCypress.configs.recommended],
  },
  {
    files: ['cypress/support/**/*.ts'],
    rules: {
      '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
    },
  },
  eslintConfigPrettier,
]);
