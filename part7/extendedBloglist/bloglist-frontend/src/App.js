import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

import blogService from './services/blogs'
import loginService from './services/login'

import Home from './components/Home'
import Navigation from './components/Navigation'
import Users from './components/Users'
import User from './components/User'
import LoginPage from './components/LoginPage'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Blog from './components/Blog'

import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { Container } from 'react-bootstrap'

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
        color: 'white',
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
        <Container fluid>
            <Navigation padding={padding} handleLogout={handleLogout} user={user} />
            <Switch>
                <Route path='/users/:id'>
                    <User user={userMatch} />
                </Route>
                <Route path='/users'>
                    <Users users={users} />
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
                    <Home blogs={blogs} handleLogout={handleLogout} />
                </Route>
            </Switch>
        </Container>
    )
}

export default App
