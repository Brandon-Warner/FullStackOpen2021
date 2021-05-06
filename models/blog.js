const mongoose = require('mongoose')
require('dotenv').config()

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

module.exports = mongoose.model('Blog', blogSchema)
