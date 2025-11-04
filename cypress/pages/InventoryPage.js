// cypress/page-objects/InventoryPage.js
class InventoryPage {
  // === LOCATORS ===
  addToCartButton = (productName) =>
    `.inventory_item:contains("${productName}") button:contains("Add to cart")`

  removeButton = (productName) =>
    `.inventory_item:contains("${productName}") button:contains("Remove")`

  cartBadge = '.shopping_cart_badge'
  cartLink = '.shopping_cart_link'

  // === ACTIONS ===
  addProductToCart(productName) {
    cy.contains('.inventory_item', productName)
      .find('button')
      .contains('Add to cart')
      .click()

    // Lấy số lượng hiện tại → so sánh
    this.getCartCount().then(count => {
      this.verifyCartBadge(count)
    })
  }

  removeProductFromCart(productName) {
    cy.contains('.inventory_item', productName)
      .find('button')
      .contains('Remove')
      .click()
  }

  goToCart() {
    cy.get(this.cartLink).click()
  }

  // === UTILS ===
  getCartCount() {
    return cy.get('body').then($body => {
      if ($body.find(this.cartBadge).length > 0) {
        return Cypress.$('span.shopping_cart_badge').text()
      }
      return 0
    })
  }

  verifyCartBadge(expectedCount) {
    if (expectedCount === 0) {
      cy.get(this.cartBadge).should('not.exist')
    } else {
      cy.get(this.cartBadge).should('contain.text', expectedCount.toString())
    }
  }
}

export default new InventoryPage()