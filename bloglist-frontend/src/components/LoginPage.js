import React from 'react'
import Notification from './Notification'
import LoginForm from './LoginForm'

const LoginPage = ({ username, password, setUsername, setPassword, handleLogin }) => {
    return (
        <div className='container'>
            <h2>Please Log In</h2>
            <Notification />
            <LoginForm
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                handleLogin={handleLogin}
            />
        </div>
    )
}

export default LoginPage
