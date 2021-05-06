// contain all of the routes
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs)
    })
})

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)

    blog.save()
        .then((result) => {
            response.json(result)
        })
        .catch((error) => {
            console.log(error.message)
            next()
        })
})

blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch((error) => next(error))
})

module.exports = blogsRouter
