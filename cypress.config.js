const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require('@shelex/cypress-allure-plugin/writer')
module.exports = defineConfig({
  env: {
    USERNAME: "123",
    PASSWORD: "222",
  },
  e2e: {
    // specPattern: "**/*.f
    // baseUrl: "https://www.saucedemo.com", // QUAN TRỌNG: để /inventory.html hoạt động
    // specPattern: "**/*.cy.js",
    specPattern: ["**/*.feature", "**/*.cy.js"],

    // reporter: "mochawesome",
    // reporterOptions: {
    //   reportDir: "cypress/reports",
    //   overwrite: false,
    //   html: true,
    //   json: true,
    //   timestamp: "mmddyyyy_HHMMss",
    //   reportFilename: "mochawesome",
    //   charts: true,
    //   embeddedScreenshots: true,
    //   inlineAssets: true,
    //   reportPageTitle: "Saucedemo E2E Test Report",
    //   saveJson: true,
    // },
    env: {
      allure: true,
      allureResultsPath: 'cypress/allure-results'
    },
    async setupNodeEvents(on, config) {
      allureWriter(on, config)
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },

    
    chromeWebSecurity: false,
    supportFile: "cypress/support/e2e.js",
  },
});
