// cypress/e2e/step_definitions/login.steps.js
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('user is on the login page', () => {
  cy.visit('https://www.saucedemo.com')
})

When('user enters {string} and {string}', (username, password) => {
  // Xử lý trường hợp trống
  if (username) cy.get('[data-test="username"]').clear().type(username)
  else cy.get('[data-test="username"]').clear()

  if (password) cy.get('[data-test="password"]').clear().type(password)
  else cy.get('[data-test="password"]').clear()

  cy.get('[data-test="login-button"]').click()
})

Then('the system displays {string}', (expectedResult) => {
  if (expectedResult === 'Home page displayed') {
    cy.url().should('include', '/inventory.html')
    cy.get('.title').should('contain.text', 'Products')
  } else {
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', expectedResult)
  }
})