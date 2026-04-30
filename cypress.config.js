const { defineConfig } = require("cypress")
const { allureCypress } = require("allure-cypress/reporter")
const cypressOnFix = require("cypress-on-fix")
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor")
const preprocessor = require("@badeball/cypress-cucumber-preprocessor")
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild")


async function setupNodeEvents(on, config) {
  on = cypressOnFix(on)

  await preprocessor.addCucumberPreprocessorPlugin(on, config)

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin.default(config)]
    })
  )

  allureCypress(on, config, {
    resultsDir: 'allure-results'
  })

  on('task', {
    seedAdmin() {
      return db.seedAdmin()
    },
    getUsers() {
      return db.getUsers()
    }
  })

  return config
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    specPattern: ['**/*.feature', '**/*.cy.js'],
    baseUrl: 'http://127.0.0.1:3000',
    experimentalWebKitSupport: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000
  }
})
