const { defineConfig } = require("cypress")
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor")
const preprocessor = require("@badeball/cypress-cucumber-preprocessor")
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild")

const { allureCypress } = require("allure-cypress/reporter")

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config)

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  )

  allureCypress(on, config)

  return config
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    specPattern: ["**/*.feature", "**/*.cy.js"],
    baseUrl: "http://localhost:3000",
  },
})
