import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
    const notification = useSelector(state => state)
    if (notification === 'Wrong username or password') {
        return <Alert variant='danger'>{notification}</Alert>
    } else if (notification === 'Welcome to blogslist!') {
        return <Alert variant='success'>{notification}</Alert>
    }
    return null
}

export default Notification
