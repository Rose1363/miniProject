// cypress/page-objects/CartPage.js
class CartPage {
  removeButtonInCart = (name) => `.cart_item:contains("${name}") button:contains("Remove")`

  removeItem(name) {
    cy.contains('.cart_item', name)
      .find('button')
      .contains('Remove')
      .click()
  }

  verifyItemInCart(name, shouldExist = true) {
    cy.contains('.cart_item', name).should(shouldExist ? 'exist' : 'not.exist')
  }

  verifyCartEmpty() {
    cy.get('.cart_item').should('have.length', 0)
  }

  goBackToInventory() {
    cy.get('[data-test="continue-shopping"]').click()
  }
}

export default new CartPage()