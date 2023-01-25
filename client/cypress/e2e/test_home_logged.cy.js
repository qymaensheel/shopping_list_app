describe('home page for logged user', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login')

        cy.get('[data-testid="login-username-field"]')
            .type('test_user').should('have.value', 'test_user')

        cy.get('[data-testid="login-password-field"]')
            .type('testpass').should('have.value', 'testpass')

        cy.contains('Log in').click()

        cy.url().should('equal', 'http://localhost:3000/')
        cy.contains('ShoppingApp')
    })

    it('creates new shopping list', () => {
        // '[data-testid=""]'
        // cy.get('[data-testid=""]')

        cy.contains('Create List').click()
        cy.url().should('include', '/createList')

        cy.get('[data-testid="create-form-title-field"]')
            .type('My shopping list')
        cy.get('[data-testid="create-form-items-field"]')
            .type('apples 1\nbananas 2')

        cy.contains('Add list').click()

        cy.contains('List created successfully')

    })

    it('checks required error fields', () => {
        // '[data-testid=""]'
        // cy.get('[data-testid=""]')

        cy.contains('Create List').click()
        cy.url().should('include', '/createList')

        cy.contains('Add list').click()

        cy.get('[data-testid="create-form-title-required"]')
            .should("be.visible")
            .and("contain", `Title is required`)

        cy.get('[data-testid="create-form-items-required"]')
            .should("be.visible")
            .and("contain", `Items are required`)
    })

    it('checks title too long error field', () => {
        // '[data-testid=""]'
        // cy.get('[data-testid=""]')

        cy.contains('Create List').click()
        cy.url().should('include', '/createList')

        cy.get('[data-testid="create-form-title-field"]')
            .type('asdasdasdasdasdasdasdasdasdaasdasdasdasdasd')

        cy.contains('Add list').click()

        cy.get('[data-testid="create-form-title-long"]')
            .should("be.visible")
            .and("contain", `Maximum characters should be 30`)
    })

    it('checks items too long error field', () => {
        // '[data-testid=""]'
        // cy.get('[data-testid=""]')

        cy.contains('Create List').click()
        cy.url().should('include', '/createList')

        for (let i = 0; i < 27 ; i++) {
            cy.get('[data-testid="create-form-items-field"]')
                .type(`test item ${i+1}\n`)
        }

        cy.contains('Add list').click()

        cy.get('[data-testid="create-form-items-long"]')
            .should("be.visible")
            .and("contain", `Maximum characters should be 255`)
    })
})



