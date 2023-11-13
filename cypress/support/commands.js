import './commands'
import './e2e';
import 'cypress-iframe';

Cypress.on('uncaught:exception', (err, runnable) => {

  return false
})

// after(() => {
//   cy.exec('node ./cypress/support/multiple-cucumber-html-reporter.js')
// });