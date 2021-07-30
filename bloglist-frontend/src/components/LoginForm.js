import React from 'react'

const LoginForm = ({
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
}) => {
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type='text'
                        value={username}
                        className='username'
                        onChange={({ target }) => setUsername(target.value)}
                    />
                    <br></br>
                    password
                    <input
                        type='password'
                        value={password}
                        className='password'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit' className='login-button'>
                    login
                </button>
            </form>
        </div>
    )
}
export default LoginForm
