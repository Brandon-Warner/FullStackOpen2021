const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: { type: String, minlength: 3, required: true },
    author: { type: String, minlength: 3, required: true },
    url: { type: String, minlength: 3, required: true },
    likes: { type: Number, minlength: 1, required: false },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comments: {
        type: Array,
        required: false,
    },
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
