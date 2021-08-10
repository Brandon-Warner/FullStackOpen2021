import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

import blogService from './services/blogs'
import loginService from './services/login'

import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import LoginPage from './components/LoginPage'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Blog from './components/Blog'

import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const users = useSelector(state => state.users)

    const match_user = useRouteMatch('/users/:id')
    const match_blog = useRouteMatch('/blogs/:id')
    const userMatch = match_user ? users.find(user => user.id === match_user.params.id) : null
    const blogMatch = match_blog ? blogs.find(blog => blog.id === match_blog.params.id) : null

    const padding = {
        padding: 5,
    }

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async event => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password,
            })

            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            dispatch(setNotification('Welcome to blogslist!'))
        } catch (exception) {
            console.log('error', exception)
            dispatch(setNotification('Wrong username or password'))
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    if (user === null) {
        return (
            <LoginPage
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                handleLogin={handleLogin}
            />
        )
    }
    return (
        <div className='container'>
            <div>
                <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responseive-navbar-nav'>
                        <Nav className='mr-auto'>
                            <Nav.Link href='#' as='span'>
                                <Link style={padding} to='/'>
                                    home
                                </Link>
                            </Nav.Link>
                            <Nav.Link href='#' as='span'>
                                <Link style={padding} to='/users'>
                                    users
                                </Link>
                            </Nav.Link>
                            <Nav.Link href='#' as='span'>
                                <Link style={padding} to='/blogs'>
                                    blogs
                                </Link>
                            </Nav.Link>
                            <Nav.Link href='#' as='span'>
                                {user.name} is logged in{' '}
                                <Button variant='secondary' onClick={handleLogout} size='sm'>
                                    Logout
                                </Button>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <Switch>
                <Route path='/users/:id'>
                    <User user={userMatch} />
                </Route>
                <Route path='/users'>
                    <Users users={users} user={user} />
                </Route>
                <Route path='/blogs/:id'>
                    <Blog blog={blogMatch} />
                </Route>
                <Route path='/blogs'>
                    <Blogs blogs={blogs} />
                </Route>
                <Route path='/login'>
                    <LoginForm />
                </Route>
                <Route path='/'>
                    <Home user={user} blogs={blogs} handleLogout={handleLogout} />
                </Route>
            </Switch>
        </div>
    )
}

export default App
