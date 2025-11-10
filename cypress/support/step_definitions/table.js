import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import Papa from "papaparse";

let csvData = [];

Given('open the users table page', () => {
  cy.visit('http://localhost:4000/home.html');
});

When('read data from {string}', (fileName) => {
  cy.fixture(fileName).then((data) => {
    const parsed = Papa.parse(data, { header: true, skipEmptyLines: true });
    csvData = parsed.data.filter(
      (row) => row.id && row.name && row.email && row.role
    );
  });
});

Then('the table content should match the csv data', () => {
  csvData.forEach((user, index) => {
    // Chọn hàng trong tbody (bắt đầu từ <tr>)
    cy.get('#user-table tbody tr').eq(index).within(() => {
      cy.get('td').eq(0).should('have.text', user.id);
      cy.get('td').eq(1).should('have.text', user.name);
      cy.get('td').eq(2).should('have.text', user.email);
      cy.get('td').eq(3).should('have.text', user.role);
    });
  });
});
