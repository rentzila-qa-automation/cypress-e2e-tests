import { defineConfig } from 'cypress';
import { allureCypress } from 'allure-cypress/reporter';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, { resultsDir: 'allure-results' });
      return config;
    },
    baseUrl: 'https://dev.rentzilla.com.ua',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1440,
    viewportHeight: 900,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    video: false,
    screenshotOnRunFailure: true,
    retries: { runMode: 1, openMode: 0 },
  },
});
