import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
    const notification = useSelector(state => state.notification)
    if (notification === 'Wrong username or password') {
        return (
            <Alert className='animated slideInDown' transition={true} variant='danger'>
                {notification}
            </Alert>
        )
    } else if (notification === 'Welcome to blogslist!') {
        return (
            <Alert className='Notification' transition={true} variant='success'>
                {notification}
            </Alert>
        )
    }
    return null
}

export default Notification
