describe('navbar tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('checks home link for unlogged user', () => {
        cy.contains('Home').click()
        cy.url().should('include', '/')
    })

    it('checks navbar login link for unlogged user', () => {
        cy.contains('Login').click()
        cy.url().should('include', '/login')
    })

    it('checks register link for unlogged user', () => {
        cy.contains('Register').click()
        cy.url().should('include', '/register')
    })

    it('checks logged in user links', () => {
        // '[data-testid=""]'
        // cy.get('[data-testid=""]')
        cy.visit('http://localhost:3000/login')

        cy.get('[data-testid="login-username-field"]')
            .type('test_user').should('have.value', 'test_user')

        cy.get('[data-testid="login-password-field"]')
            .type('testpass').should('have.value', 'testpass')

        cy.contains('Log in').click()

        cy.url().should('equal', 'http://localhost:3000/')
        cy.contains('Create List')
        cy.contains('Logout')
    })
})
