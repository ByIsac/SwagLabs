const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const process = require('node:process');

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1250,
  defaultCommandTimeout: 40000,
  chromeWebSecurity: true,
  video: false,
  experimentalMemoryManagement: true,
  numTestsKeptInMemory: 1,
  e2e: {
    specPattern: "cypress/e2e/features/*.feature",
    baseUrl: process.env.BASE_URL ?? "https://www.google.com.br",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents,
  },
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/test-output-[hash].xml',
  }
});
