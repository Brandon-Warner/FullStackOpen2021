const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: 'unknown endpoint' })
    next()
}

const tokenVerification = (request, response, next) => {
    const authHeader = request.get('authorization')
    if (authHeader !== 'undefined') {
        const authToken = authHeader.split(' ')
        const token = authToken[1]
        console.log('token: ', token)
        request.token = token
        next()
    } else {
        response.sendStatus(403)
    }
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'ValidationError') {
        response.status(400).send({ error: 'invalid request' })
    } else if (error.name === 'CastError') {
        response.status(400).send({ error: error.message })
    } else if (error.name === 'TypeError') {
        response.status(400).send({ error: error.message })
    }

    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenVerification,
}
