describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Timmy Turner',
            username: 'timmy',
            password: 'turner',
            blogs: [],
        }
        cy.request('POST', 'http://localhost:3000/api/users', user)
        cy.visit('http://localhost:3000/')
    })
    it('Login form is shown', function () {
        cy.contains('Please Log In')
        cy.contains('login')
    })
})
