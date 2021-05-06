const config = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('---')
    next()
}
app.use(requestLogger)

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.message === 'ValidationError') {
        response.status(400).send({ error: 'invalid request' })
    }

    next(error)
}
app.use(errorHandler)

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})
