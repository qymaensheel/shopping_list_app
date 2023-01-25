describe('logging in', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login')
    })

    it('directs to login page', () => {
        cy.contains('Create account here').click()
        cy.url().should('include', '/register')
    })

    it('logs in test user successfully', () => {


        cy.get('[data-testid="login-username-field"]')
            .type('test_user').should('have.value', 'test_user')

        cy.get('[data-testid="login-password-field"]')
            .type('testpass').should('have.value', 'testpass')

        cy.contains('Log in').click()

        cy.url().should('equal', 'http://localhost:3000/')
        cy.contains('ShoppingApp')
    })

    it('checks all value errors', () => {

        cy.get('[data-testid="login-submit"]').click()

        cy.get('[data-testid="username-required"]')
            .should("be.visible")
            .and("contain", 'Username is required')

        cy.get('[data-testid="password-required"]')
            .should("be.visible")
            .and("contain", 'Password is required')

    })

    it('checks username too long error msg', () => {

        cy.get('[data-testid="login-username-field"]')
            .type('asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda')

        cy.get('[data-testid="login-submit"]').click()

        cy.get('[data-testid="username-long"]')
            .should("be.visible")
            .and("contain", `Username too long`)

    })

    it('checks password too short error msg', () => {

        cy.get('[data-testid="login-password-field"]')
            .type('a')

        cy.get('[data-testid="login-submit"]').click()

        cy.get('[data-testid="password-short"]')
            .should("be.visible")
            .and("contain", 'Password too short')

    })

})