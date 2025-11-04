import LoginPage from "../pages/LoginPage"

describe('Login với POM', () => {
    
  it('Đăng nhập thành công', () => {
    LoginPage.visit()
    // LoginPage.login('standard_user', 'secret_sauce')
    cy.loginAs('standard')
    cy.url().should('include', '/inventory.html')
   
  })

  it('Đăng nhập thất bại', () => {
    LoginPage.visit()
    LoginPage.login('wrong', 'wrong')

    LoginPage.getErrorMessage()
      .should('contain', 'Username and password do not match')
  })
})