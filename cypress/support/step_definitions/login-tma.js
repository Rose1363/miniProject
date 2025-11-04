import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import 'cypress-xpath';
// import 'cypress-mochawesome-reporter/cucumberSupport';
const username = Cypress.env('USERNAME')
const password = Cypress.env('PASSWORD')

Given('the user is on the home page', () => {
    cy.visit('https://t-learning-dc29.tmainnovation.vn');
});

When(/^clicks on the (.*) button$/, (buttonName) => {
  cy.xpath(`//span[text()="${buttonName}"]`).click();
});

When('enters {string} and {string}', (username, password) => {
    if (username) {
        cy.xpath('//input[@id="email"]').type(username);
    }
    if (password) {
        cy.xpath('//input[@id="password"]').type(password);
    }
    cy.xpath('//input[@id="kc-login"]').click();
});

Then('the system should display {string}', (expectedResult) => {
  if (expectedResult === 'Home page displayed') {
    cy.contains('p.avatar-color', 'Tram Nguyen', { timeout: 10000 }).should('be.visible');
  } else if (expectedResult === 'Invalid username or password') {
    cy.contains('Invalid username or password', { timeout: 10000 }).should('be.visible');
  } else if (expectedResult === 'Email is required, Password is required') {
    cy.xpath('//small[@class="msg-required"]/span')
      .should('contain.text', 'Email is required')
      .and('be.visible');
    cy.xpath('//small[@class="msg-required"]/span')
      .should('contain.text', 'Password is required')
      .and('be.visible');
  }
});



Given('the user has logged in successfully', () => {
    cy.visit('https://t-learning-dc29.tmainnovation.vn');
    cy.xpath('//span[text()="Login"]').click();
    cy.xpath('//input[@id="email"]').type(username);
    cy.xpath('//input[@id="password"]').type(password);
    cy.xpath('//input[@id="kc-login"]').click();
    cy.contains('p.avatar-color', 'Tram Nguyen', { timeout: 10000 }).should('be.visible');
});


//Logout
When('clicks the logout button', () => {
    cy.xpath('//i[contains(@class,"pi-chevron-down")]').click();

    cy.xpath('//ul[contains(@class,"dropdown-menu")]')
        .should('be.visible');

    cy.xpath('//button[contains(@class,"dropdown-item") and contains(.,"Log out")]')
        .should('be.visible')
        .click();
});


Then('the system should navigate to the login page', () => {
    cy.xpath('//span[text()="Login"]').should('be.visible')
});


//Switch language dropdown
When('selects {string} from the language dropdown', (language) => {
    cy.xpath('//div[contains(@class,"ant-select-selector")]').click({ force: true });
    cy.xpath(`//div[contains(@class,"ant-select-item-option-content") and normalize-space()="${language}"]`)
        .click({ force: true });
});

Then('the page should display {string}', (text) => {
    cy.contains(text, { timeout: 10000 }).should('be.visible');
});

// Forgot password link
When('clicks on the Forgot password link', () => {
    cy.xpath('//span[contains(text(),"Forgot password?")]').click({ force: true });
});

Then('the URL should contain {string}', (urlPart) => {
    cy.url().should('include', urlPart);
});

//TMA logo visibility
Then('the TMA logo should be visible', () => {
    cy.xpath('//img[@class="logo" and contains(@alt,"T-Learning Logo")]').should('be.visible');
});

//Title and subtitle
Then('the page should display the title {string}', (titleText) => {
    cy.xpath(`//span[normalize-space()="${titleText}"]`).should('be.visible');
});

Then('the subtitle {string}', (subtitleText) => {
    cy.xpath(`//span[normalize-space()="${subtitleText}"]`).should('be.visible');
});

//Toggle password visibility
When('types password {string}', (password) => {
    cy.xpath('//input[@id="password"]').clear().type(password);
});

When('clicks the eye icon', () => {
    cy.xpath('//i[contains(@class,"fa-eye")]').click()
});

Then('the password field should be visible', () => {
    cy.xpath('//input[@id="password"]').should('have.attr', 'type', 'text');
});

When('clicks the eye-slash icon', () => {
    cy.xpath('//i[contains(@class,"fa-eye-slash")]').click()
});

Then('the password field should be hidden', () => {
    cy.xpath('//input[@id="password"]').should('have.attr', 'type', 'password');
});
