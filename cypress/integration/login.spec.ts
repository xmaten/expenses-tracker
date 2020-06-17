describe('login', () => {
  it('logins to account', () => {
    cy.visit('http://localhost:3000')
    cy.get('input#basic_email').type('maten@test.com')
    cy.get('input#basic_password').type('tester123')
    cy.contains('button', 'Login').click()
    cy.url().should('include', '/overview')
  })
})

export {}
