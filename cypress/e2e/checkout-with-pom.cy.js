import CheckoutPage from "../pages/CheckoutPage"
import InventoryPage from "../pages/InventoryPage"
import LoginPage from "../pages/LoginPage"

describe('Checkout Flow với POM', () => {
    const PRODUCT = 'Sauce Labs Backpack'
  beforeEach(() => {
    // Login trước
    LoginPage.visit()
    LoginPage.login('standard_user', 'secret_sauce')

    // Thêm 1 sản phẩm
    InventoryPage.addProductToCart(PRODUCT)
    InventoryPage.goToCart()

    // Vào trang Checkout
    cy.get('[data-test="checkout"]').click()
  })

  it('Checkout thành công', () => {
    CheckoutPage.completeCheckout('Nguyễn', 'Văn A', '700000')

    // Kiểm tra kết quả
    CheckoutPage.getSuccessMessage()
      .should('contain', 'Your order has been dispatched')
  })

  it('Hiển thị lỗi khi thiếu tên', () => {
    CheckoutPage.fillShippingInfo('', 'Nguyễn', '700000')
    CheckoutPage.clickContinue()

    CheckoutPage.getErrorMessage()
      .should('contain', 'Error: First Name is required')
  })
})