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
    describe('Login', function () {
        it('succeeds with valid credentials', function () {
            cy.contains('login').click()
            cy.get('.username').type('timmy')
            cy.get('.password').type('turner')
            cy.get('.login-button').click()

            cy.contains('Timmy Turner is logged in')
        })
    })
    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'timmy', password: 'turner' })
        })
        it('a new blog can be created', function () {
            cy.contains('New Blog').click()
            cy.get('.title').type('blogTitle')
            cy.get('.author').type('blogAuthor')
            cy.get('.url').type('blogUrl')
            cy.contains('Save Blog').click()
            cy.visit('http://localhost:3000/')

            cy.contains('blogTitle')
        })
        describe('When a blog already exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'title1',
                    author: 'author1',
                    url: 'url1',
                })
            })
            it('a blog can be liked', function () {
                cy.contains('title1').contains('view').click()
                cy.contains('title1').contains('like').click()

                cy.contains('likes').contains('1')
            })
            it.only('blog can only be deleted creator user', function () {
                cy.contains('title1').contains('view').click()
                cy.contains('title1').contains('remove').click()
                cy.on('window:confirm', str => {
                    expect(str).to.eq('Are you sure you want to delete title1?')
                })
            })
        })
    })
})
