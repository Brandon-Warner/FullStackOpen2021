require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: { type: String, minlength: 3, required: true },
    author: { type: String, minlength: 3, required: true },
    url: { type: String, minlength: 3, required: true },
    likes: { type: Number, minlength: 1, required: true },
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

const Blog = mongoose.model('Blog', blogSchema)

console.log('connecting to', process.env.MONGODB_URI)

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error.message)
    })

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog.save()
        .then((result) => {
            response.status(201).json(result)
        })
        .catch((error) => {
            console.log(error.message)
        })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
