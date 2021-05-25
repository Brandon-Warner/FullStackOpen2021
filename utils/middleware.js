const jwt = require('jsonwebtoken')
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

const userVerification = (request, response, next) => {
    const authHeader = request.get('authorization')
    if (authHeader !== 'undefined') {
        const authToken = authHeader.split(' ')
        const token = authToken[1]
        // console.log('token: ', token)
        jwt.verify(token, process.env.SECRET, (error, authData) => {
            // console.log('authData: ', authData)
            if (error) {
                response.sendStatus(403)
            } else {
                request.user = authData

                next()
            }
        })
    } else {
        response.sendStatus(403)
    }
}

const tokenVerification = (request, response, next) => {
    // console.log('request headers: ', request.headers)
    const authHeader = request.get('authorization')
    // console.log('authHeader: ', authHeader)
    if (authHeader !== 'undefined') {
        const authToken = authHeader.split(' ')
        const token = authToken[1]
        // console.log('token: ', token)
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
    userVerification,
}
