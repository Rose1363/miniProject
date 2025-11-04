class LoginPage {
  // === LOCATORS ===
  usernameInput = '[data-test="username"]'
  passwordInput = '[data-test="password"]'
  loginButton = '[data-test="login-button"]'
  errorMessage = '[data-test="error"]'

  // === ACTIONS ===
  visit() {
    cy.visit('https://www.saucedemo.com/')
  }

  typeUsername(username) {
    cy.get(this.usernameInput).clear().type(username)
  }

  typePassword(password) {
    cy.get(this.passwordInput).clear().type(password)
  }

  clickLogin() {
    cy.get(this.loginButton).click()
  }

  login(username, password) {
    this.typeUsername(username)
    this.typePassword(password)
    this.clickLogin()
  }

  getErrorMessage() {
    return cy.get(this.errorMessage)
  }
}

export default new LoginPage()