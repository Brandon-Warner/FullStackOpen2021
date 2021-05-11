const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
    {
        title: 'Ducks For Life',
        author: 'Tucker Legg',
        url: 'www.ilovemyducks.com',
        likes: 15,
        id: '609ace54a851f5066ec1efc7',
    },
    {
        title: 'Blazer Fans4U',
        author: 'Wells Fryan',
        url: 'www.gozers.com',
        likes: 10,
        id: '609ace54a851f5066ec1efc8',
    },
    {
        title: 'Seattle United',
        author: 'Shawn Zayne',
        url: 'www.pudgetcrown.com',
        likes: 12,
        id: '609ace54a851f5066ec1efc9',
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are 3 blogs returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('all blogs have an id', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map((r) => r.id)

    expect(ids).toBeDefined()
})

test('successfully adding a blog', async () => {
    const newBlog = {
        title: 'Practice blog',
        author: 'Donald Duck',
        url: 'www.blogs.com',
        likes: '7',
        id: '369',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map((r) => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('Practice blog')
})

test('blog has likes property', async () => {
    const newBlog = {
        title: 'Practice blog',
        author: 'Donald Duck',
        url: 'www.blogs.com',

        id: '369',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const likes = response.body.map((r) => r.likes)

    expect(likes).toBeDefined()
})

test('blog will be rejected if no title', async () => {
    const newBlog = {
        author: 'Donald Duck',
        url: 'www.blogs.com',
        likes: '7',
        id: '369',
    }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})
