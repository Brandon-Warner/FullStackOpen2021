import React from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
}) => {
    return (
        <div>
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
                    >
                        login
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}
export default LoginForm
