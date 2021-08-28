import React from 'react'
import { Form, Button } from 'react-bootstrap'

const loginStyle = {
    maxWidth: '600px',
    margin: '0 auto'
}

const LoginForm = ({ username, setUsername, password, setPassword, handleLogin }) => {
    return (
        <div style={loginStyle}>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>username</Form.Label>

                    <Form.Control
                        type='text'
                        value={username}
                        className='username'
                        onChange={({ target }) => setUsername(target.value)}
                    />
                    <Form.Label>password</Form.Label>

                    <Form.Control
                        type='password'
                        value={password}
                        className='password'
                        onChange={({ target }) => setPassword(target.value)}
                    />

                    <Button
                        variant='primary'
                        type='submit'
                        className='login-button'
                        style={{ margin: '5px 0 0 0' }}
                    >
                        login
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}
export default LoginForm
