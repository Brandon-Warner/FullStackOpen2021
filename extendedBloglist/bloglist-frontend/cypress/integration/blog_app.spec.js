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
    it('login form is shown', function () {
        cy.contains('Please Log In')
        cy.contains('login')
    })
    describe('login', function () {
        it('succeeds with valid credentials', function () {
            cy.contains('login').click()
            cy.get('.username').type('timmy')
            cy.get('.password').type('turner')
            cy.get('.login-button').click()

            cy.contains('Timmy Turner is logged in')
        })
    })
    describe('when logged in', function () {
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
        describe('when a blog already exists', function () {
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
            it('blog can only be deleted creator user', function () {
                cy.contains('title1').contains('view').click()
                cy.contains('title1').contains('remove').click()
                cy.on('window:confirm', str => {
                    expect(str).to.eq('Are you sure you want to delete title1?')
                })
                cy.wait(2000)
                cy.visit('http://localhost:3000/')
            })
            describe('when multiple blogs exist', function () {
                beforeEach(function () {
                    cy.createBlog({
                        title: 'title2',
                        author: 'author2',
                        url: 'url2',
                    })
                    cy.createBlog({
                        title: 'title3',
                        author: 'author3',
                        url: 'url3',
                    })
                })
                it('blogs are in order of most to least likes', function () {
                    cy.get('.blog')
                        .find('button')
                        .then(buttons => {
                            cy.wrap(buttons[0]).click()
                            cy.wrap(buttons[1]).click()
                            cy.wrap(buttons[2]).click()
                        })
                    cy.wait(2000)
                    cy.get('.like').then(buttons => {
                        cy.wrap(buttons[0]).click()
                        cy.wrap(buttons[1]).click()
                        cy.wrap(buttons[2]).click()
                        cy.wait(2000)
                        cy.wrap(buttons[0]).click()
                        cy.wrap(buttons[1]).click()
                        cy.wait(2000)
                        cy.wrap(buttons[0]).click()
                        cy.wait(2000)
                    })
                    cy.get('.blog').then(blogs => {
                        cy.wrap(blogs[0]).contains('likes').contains('3')
                        cy.wrap(blogs[1]).contains('likes').contains('2')
                        cy.wrap(blogs[2]).contains('likes').contains('1')
                    })
                })
            })
        })
    })
})
