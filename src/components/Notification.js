import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notification)
    console.log('NOTIFICATION: ', notification)
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
    }
    if (notification.length > 0) {
        return <div style={style}>{`you voted: ${notification}`}</div>
    } else {
        return null
    }
}

export default Notification
