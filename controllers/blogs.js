// contain all of the routes
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post(
    '/',
    middleware.tokenVerification,
    async (request, response) => {
        console.log('request token: ', request.token)
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response
                .status(401)
                .json({ error: 'token missing or invalid' })
        }
        const body = request.body
        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            id: body.id,
            user: user.id,
        })
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.json(savedBlog.toJSON())
    }
)

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        id: body.id,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: blog.likes,
    })
    response.json(updatedBlog)
})

blogsRouter.delete(
    '/:id',
    middleware.tokenVerification,
    async (request, response) => {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response
                .status(401)
                .json({ error: 'token missing or invalid' })
        }
        const blog = await Blog.findById(request.params.id)
        console.log('blog: ', blog.user.toString())
        const userid = await User.findById(decodedToken.id)
        console.log('userid: ', userid.id.toString())
        if (blog.user.toString() === userid.id.toString()) {
            await Blog.findByIdAndRemove(blog)
            response.status(204).end()
        } else {
            response.sendStatus(403)
        }
    }
)

module.exports = blogsRouter
