import React from 'react'

import { Alert } from 'react-bootstrap'

const Notification = ({ message }) => {
    if (message === null) return null
    else if (message.includes('Wrong')) {
        return <Alert variant='danger'>{message}</Alert>
    } else if (message.includes('blog')) {
        return <Alert variant='success'>{message}</Alert>
    }
}

export default Notification
