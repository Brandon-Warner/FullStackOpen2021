import React from 'react'

const Notification = ({ message }) => {
    const errorStyle = {
        color: 'red',
        fontSize: '16',
    }

    const messageStyle = {
        color: 'green',
        fontSize: '16',
    }
    if (message === null) return null
    else if (message.includes('Wrong')) {
        return <h3 style={errorStyle}>{message}</h3>
    } else if (message.includes('blog')) {
        return <h3 style={messageStyle}>{message}</h3>
    }
}

export default Notification
