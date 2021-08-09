import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

import Home from './components/Home'
import Users from './components/Users'
import LoginPage from './components/LoginPage'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const users = useSelector(state => state.users)

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
            <Router>
                <div>
                    <Link style={padding} to='/'>
                        home
                    </Link>
                    <Link style={padding} to='/users'>
                        users
                    </Link>
                    <Link style={padding} to='/blogs'>
                        notes
                    </Link>
                    <Link style={padding} to='/login'>
                        login
                    </Link>
                </div>
                <Switch>
                    <Route path='/users'>
                        <Users users={users} user={user} />
                    </Route>
                    <Route path='/blogs'>
                        <BlogList />
                    </Route>
                    <Route path='/login'>
                        <LoginForm />
                    </Route>
                    <Route path='/'>
                        <Home user={user} blogs={blogs} handleLogout={handleLogout} />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
