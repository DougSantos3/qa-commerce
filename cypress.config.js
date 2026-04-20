const { defineConfig } = require("cypress")
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor")
const preprocessor = require("@badeball/cypress-cucumber-preprocessor")
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild")

const { allureCypress } = require("allure-cypress/reporter")

const cypressOnFix = require("cypress-on-fix")

async function setupNodeEvents(on, config) {
  on = cypressOnFix(on)
  
  await preprocessor.addCucumberPreprocessorPlugin(on, config)

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  )

  allureCypress(on, config, {
    resultsDir: "allure-results"
  })

  return config
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    specPattern: ["**/*.feature", "**/*.cy.js"],
    baseUrl: "http://localhost:3000",
    experimentalWebKitSupport: true
  },
})
