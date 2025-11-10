describe('Full Cypress Demo: E2E + Mocking/Stubbing (HTML Frontend)', () => {
  const APP_URL = 'http://localhost:4000'

  beforeEach(() => {
    cy.visit(APP_URL)
  })


  it('Login success → hiển thị "Welcome, Administrator!"', () => {
    cy.intercept('POST', '**/api/login').as('loginReq')

    cy.get('#username').type('admin')
    cy.get('#password').type('123456')
    cy.get('#login-btn').click()

    cy.wait('@loginReq').then((i) => {
      expect(i.response.statusCode).to.eq(200)
      expect(i.response.body.success).to.be.true
    })

    cy.contains('Welcome to Home Page')
  })

  it('Login thất bại → hiển thị thông báo lỗi', () => {
    cy.intercept('POST', '**/api/login').as('loginReq')

    cy.get('#username').type('wrong_user')
    cy.get('#password').type('wrong_pass')
    cy.get('#login-btn').click()

    cy.wait('@loginReq').then((i) => {
      expect(i.response.statusCode).to.eq(401)
    })

    cy.get('#msg').should('contain', 'Invalid credentials')
  })


  it('Giả lập login chậm → kiểm tra spinner hiển thị đúng', () => {
    cy.intercept('POST', '**/api/login', {
      statusCode: 200,
      body: { success: true, user: { name: 'Giả Lập Tốc Độ Chậm' } },
      delay: 2000
    }).as('slowMockLogin')

    cy.get('#username').type('mock_user')
    cy.get('#password').type('mock_pass')
    cy.get('#login-btn').click()

   
    cy.get('#loading-spinner').should('be.visible')

    cy.wait('@slowMockLogin')

    cy.get('#loading-spinner').should('not.be.visible')
    cy.get('#result').should('contain', 'Welcome, Giả Lập Tốc Độ Chậm!')
  })

  it('Giả lập server lỗi (500) → hiển thị thông báo lỗi UI', () => {
    cy.intercept('POST', '**/api/login', {
      statusCode: 500,
      body: { success: false, message: 'Database connection failure' }
    }).as('serverErrorMock')

    cy.get('#username').type('error_user')
    cy.get('#password').type('error_pass')
    cy.get('#login-btn').click()

    cy.wait('@serverErrorMock')

    cy.get('#msg').should('contain', 'Database connection failure')
  })

  it('Giả lập danh sách người dùng trống trên trang home', () => {
   
    cy.intercept('GET', '**/api/users', {
      statusCode: 200,
      body: []
    }).as('mockEmptyUsers')


    cy.visit(APP_URL + '/home.html')

 
    cy.wait('@mockEmptyUsers')

   
    cy.get('#user-table tbody tr').should('have.length', 0)
  })
})
