describe('home page for unlogged user', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })
    // '[data-testid=""]'
    // cy.get('[data-testid=""]')
    it('goes to login page', () => {
        cy.contains('Login').click()
        cy.url().should('include', '/login')
    })

    it('goes to signup page', () => {
        cy.contains('Register').click()
        cy.url().should('include', '/register')
    })

    it('goes to register page via please register button', () => {
        cy.contains('Please register to continue').click()
        cy.url().should('include', 'http://localhost:3000/')
    })
})
