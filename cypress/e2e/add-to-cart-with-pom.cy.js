
import CartPage from "../pages/CartPage"
import InventoryPage from "../pages/InventoryPage"
import LoginPage from "../pages/LoginPage"

describe('Add to Cart & Remove – Fix badge', () => {
  const PRODUCT = 'Sauce Labs Backpack'

  beforeEach(() => {
    cy.intercept('POST', /backtrace\.io/, { statusCode: 200, body: {} })
    LoginPage.visit()
    LoginPage.login('standard_user', 'secret_sauce')
  })

  it('Add → Badge = 1 → Remove → Badge biến mất', () => {
    // Add
    InventoryPage.addProductToCart(PRODUCT)

    // Vào giỏ → kiểm tra
    InventoryPage.goToCart()
    CartPage.verifyItemInCart(PRODUCT)

    // Xóa
    CartPage.removeItem(PRODUCT)

    // Quay lại inventory → kiểm tra badge = 0
    CartPage.goBackToInventory()
    InventoryPage.getCartCount().then(count => {
      expect(count).to.eq(0)
      InventoryPage.verifyCartBadge(0)
    })
  })

  it('Thêm nhiều sản phẩm → Xóa từng cái', () => {
    const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light']

    // Thêm 2 sản phẩm
    products.forEach(p => InventoryPage.addProductToCart(p))
    InventoryPage.verifyCartBadge(2)

    // Vào giỏ
    InventoryPage.goToCart()

    // Xóa từng cái
    CartPage.removeItem(products[0])
    CartPage.verifyItemInCart(products[0], false)
    InventoryPage.verifyCartBadge(1)

    CartPage.removeItem(products[1])
    CartPage.verifyCartEmpty()
    InventoryPage.verifyCartBadge(0)
  })
})