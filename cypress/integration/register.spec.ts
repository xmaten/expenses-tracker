describe('register', () => {
  it('create new account', () => {
    const randomNum = Math.floor(Math.random() * 1000)

    cy.visit('http://localhost:3000/register')
    cy.get('input#basic_username').type(`tester${randomNum}`)
    cy.get('input#basic_email').type(`tester${randomNum}@test.com`)
    cy.get('input#basic_password').type('tester123')
    cy.contains('button', 'Register').click()
    cy.url().should('include', '/login')
  })
})

export {}
