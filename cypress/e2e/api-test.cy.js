// cypress/e2e/api-express.cy.js
describe('API testing', () => {
  const API_URL = 'http://localhost:4000'

  // TEST 1: Login thành công
  it('POST /api/login → 200 + trả về user', () => {
    cy.request('POST', `${API_URL}/api/login`, {
      username: 'admin',
      password: '123456'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('success', true)
      expect(response.body.user).to.deep.equal({
        username: 'admin',
        password: '123456',
        name: 'Administrator'
      })
    })
  })

  // TEST 2: Login thất bại
  it('POST /api/login → 401 khi sai mật khẩu', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}/api/login`,
      body: { username: 'admin', password: 'wrong' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401)
      expect(response.body.success).to.be.false
      expect(response.body.message).to.eq('Invalid credentials')
    })
  })

  // TEST 3: GET /api/users → 200 + danh sách
  it('GET /api/users → 200 + 3 người', () => {
    cy.request('GET', `${API_URL}/api/users`)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.length(3)
        expect(response.body[0]).to.have.property('firstName', 'Rachel')
      })
  })

  // TEST 4: Kiểm tra CORS (từ domain khác)
  it('API hỗ trợ CORS', () => {
    cy.request({
      method: 'GET',
      url: `${API_URL}/api/users`,
      headers: { Origin: 'https://mycypressapp.com' }
    }).then((response) => {
      expect(response.headers).to.have.property('access-control-allow-origin', '*')
    })
  })
})