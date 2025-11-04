// support/commands.js
Cypress.Commands.add('loginAs', (userType) => {
 const users = {
    standard: { username: 'standard_user', password: 'secret_sauce' },
    locked: { username: 'locked_out_user', password: 'secret_sauce' },
    problem: { username: 'problem_user', password: 'secret_sauce' },
    performance: { username: 'performance_glitch_user', password: 'secret_sauce' }
  }
  const user = users[userType]
  cy.visit('https://www.saucedemo.com/')
  cy.get('[data-test="username"]').type(user.username)
  cy.get('[data-test="password"]').type(user.password)
  cy.get('[data-test="login-button"]').click()
})


Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Wrong assertion encountered')) {
    return false
  }
})
