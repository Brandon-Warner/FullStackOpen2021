const Blog = require('../models/blog')
const User = require('../models/user')

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

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map((blog) => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
}
