import { defineConfig } from 'allure';

export default defineConfig({
  name: 'Rentzila E2E (Cypress)',
  output: './allure-report',
  historyPath: './allure-history/history.jsonl',
  historyLimit: 30,
  plugins: {
    awesome: {
      options: {
        singleFile: true,
        reportLanguage: 'en',
      },
    },
  },
});
