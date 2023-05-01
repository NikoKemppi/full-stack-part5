describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'mattim', password: 'salaisuus', name: 'Matti Meikalainen'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mattim')
      cy.get('#password').type('salaisuus')
      cy.get('#login-button').click()
      cy.contains('Matti Meikalainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('johnny123')
      cy.get('#password').type('miumau')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'Error: wrong username or password').and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Matti Meikalainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('mattim')
      cy.get('#password').type('salaisuus')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.contains('create new')
      cy.get('#newblogtitle').type('Hunting Bigfoot')
      cy.get('#newblogauthor').type('Bigfoot Hunter')
      cy.get('#newblogurl').type('www.blogit.com/bigfoot')
      cy.get('#create-button').click()
      cy.contains('a new blog Hunting Bigfoot by Bigfoot Hunter added')
    })
  })
})