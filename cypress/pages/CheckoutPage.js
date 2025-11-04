class CheckoutPage {
  // === LOCATORS ===
  // Bước 1: Your Information
  firstNameInput = '[data-test="firstName"]'
  lastNameInput = '[data-test="lastName"]'
  postalCodeInput = '[data-test="postalCode"]'
  continueButton = '[data-test="continue"]'
  errorMessage = '[data-test="error"]'

  // Bước 2: Overview
  finishButton = '[data-test="finish"]'
  summaryTotal = '.summary_total_label'

  // Bước 3: Complete
  completeHeader = '.complete-header'
  completeText = '.complete-text'

  // === ACTIONS ===

  // Bước 1: Nhập thông tin giao hàng
  fillShippingInfo(firstName, lastName, zipCode) {
    if (firstName) {
      cy.get(this.firstNameInput).clear().type(firstName)
    } else {
      cy.get(this.firstNameInput).clear()
    }

    if (lastName) {
      cy.get(this.lastNameInput).clear().type(lastName)
    } else {
      cy.get(this.lastNameInput).clear()
    }

    if (zipCode) {
      cy.get(this.postalCodeInput).clear().type(zipCode)
    } else {
      cy.get(this.postalCodeInput).clear()
    }
  
  }

  clickContinue() {
    cy.get(this.continueButton).click()
  }

  submitShippingInfo(firstName, lastName, zipCode) {
    this.fillShippingInfo(firstName, lastName, zipCode)
    this.clickContinue()
  }

  // Kiểm tra lỗi (nếu thiếu field)
  getErrorMessage() {
    return cy.get(this.errorMessage)
  }

  // Bước 2: Xác nhận đơn hàng
  clickFinish() {
    cy.get(this.finishButton).click()
  }

  getTotalPrice() {
    return cy.get(this.summaryTotal)
  }

  // Bước 3: Kiểm tra hoàn tất
  getSuccessHeader() {
    return cy.get(this.completeHeader)
  }

  getSuccessMessage() {
    return cy.get(this.completeText)
  }

  // === FULL FLOW ===
  completeCheckout(firstName, lastName, zipCode) {
    this.submitShippingInfo(firstName, lastName, zipCode)
    this.clickFinish()
    this.getSuccessHeader().should('contain', 'Thank you for your order!')
  }
}

// Export instance để dùng ngay
export default new CheckoutPage()