import { defineConfig } from 'allure';

export default defineConfig({
  name: 'Rentzila E2E (Cypress)',
  output: './allure-report',
  plugins: {
    awesome: {
      options: {
        singleFile: true,
        reportLanguage: 'en',
      },
    },
  },
});
