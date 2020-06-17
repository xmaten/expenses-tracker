describe('overview', () => {
  it('adds new expense', () => {
    cy.visit('http://localhost:3000')
    cy.get('input#basic_email').type('maten@test.com')
    cy.get('input#basic_password').type('tester123')
    cy.contains('button', 'Login').click()

    cy.contains('button', 'Add new').click()
    cy.get('input[name="name"]').type('Test expense')
    cy.get('input[name="value"]').type(4000)
    cy.contains('button', 'OK').click()
  })

  it('adds new income', () => {
    cy.visit('http://localhost:3000')
    cy.get('input#basic_email').type('maten@test.com')
    cy.get('input#basic_password').type('tester123')
    cy.contains('button', 'Login').click()

    cy.contains('button', 'Add new').click()
    cy.get('span.ant-select-selection-item').eq(3).click()
    cy.contains('div.ant-select-item-option-content', 'income').click()
    cy.get('input[name="name"]').type('Test income')
    cy.get('input[name="value"]').type(4000)
    cy.contains('button', 'OK').click()
  })
})

export {}
