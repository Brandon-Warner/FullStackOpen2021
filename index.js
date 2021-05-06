const config = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.message === 'ValidationError') {
        response.status(400).send({ error: 'invalid request' })
    }

    next(error)
}
app.use(errorHandler)


app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})
