require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI =
    'mongodb+srv://brandonwarner5:HSF21@cluster0.m0bxt.mongodb.net/bloglist-app?retryWrites=true&w=majority'

module.exports = {
    MONGODB_URI,
    PORT,
}
