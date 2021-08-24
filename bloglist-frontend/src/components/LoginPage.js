import React from 'react'
import Notification from './Notification'
import LoginForm from './LoginForm'

const LoginPage = ({ username, password, setUsername, setPassword, handleLogin }) => {
    return (
        <div style={{ padding: '1em' }} className='container'>
            <h2 style={{ margin: '0 auto', textAlign: 'center' }}>Please log in</h2>
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
