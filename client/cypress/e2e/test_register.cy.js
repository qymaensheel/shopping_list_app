describe('registering new user', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/register')
    })

    it('goes to login page', () => {
        cy.contains('Log in here').click()
        cy.url().should('include', '/login')
    })

    it('registers new user', () => {

        let prefix = Cypress.env('user_index') || 0;
        Cypress.env('user_index', ++prefix)

        cy.get('[data-testid="username-login"]')
            .type(`test_user-${prefix}`)

        cy.get('[data-testid="email-login"]')
            .type('test@mail.com')

        cy.get('[data-testid="password-login"]')
            .type('passwd')

        cy.get('[data-testid="confirm-login"]')
            .type('passwd')

        cy.contains('Register').click()

        cy.intercept('POST', '/authentication/sign_up').as('post')
    })

    it('checks username too long error msg', () => {

        cy.get('[data-testid="username-login"]')
            .type('asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda')

        cy.get('[data-testid="register-btn"]').click()

        cy.get('[data-testid="username-long"]')
            .should("be.visible")
            .and("contain", `Maximum character limit is 25`)

    })

    it('checks email too long error msg', () => {

        cy.get('[data-testid="email-login"]')
            .type('asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdaasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda')

        cy.get('[data-testid="register-btn"]').click()

        cy.get('[data-testid="email-long"]')
            .should("be.visible")
            .and("contain", `Email too long - 100 characters max`)

    })

    it('checks password too short error msg', () => {

        cy.get('[data-testid="password-login"]')
            .type('a')

        cy.get('[data-testid="register-btn"]').click()

        cy.get('[data-testid="password-short"]')
            .should("be.visible")
            .and("contain", 'Password too short - 4 characters min')

    })

    it('checks all value errors', () => {

        cy.get('[data-testid="register-btn"]').click()

        cy.get('[data-testid="username-required"]')
            .should("be.visible")
            .and("contain", 'Username is required')

        cy.get('[data-testid="email-required"]')
            .should("be.visible")
            .and("contain", 'Email required')

        cy.get('[data-testid="password-required"]')
            .should("be.visible")
            .and("contain", 'Password required')

        cy.get('[data-testid="password-confirm"]')
            .should("be.visible")
            .and("contain", 'Confirm pass is required')

    })
})
