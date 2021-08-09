import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import LoginPage from './components/LoginPage'
import BlogList from './components/BlogList'

import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import { Button } from 'react-bootstrap'

// const User = ({ user }) => {
//     console.log('USER COMPONENT user: ', user)
//     return (
//         <div>
//             <h2>{user.name}</h2>
//             <br />
//             <h3>added blogs</h3>
//             <ul>
//                 {user.blogs.map(blog => (
//                     <li key={blog.id}>{blog.title}</li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const users = useSelector(state => state.users)

    const match = useRouteMatch('/users/:id')
    const userMatch = match ? users.find(user => user.id === match.params.id) : null

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
                <Link style={padding} to='/'>
                    home
                </Link>
                <Link style={padding} to='/users'>
                    users
                </Link>
                <Link style={padding} to='/blogs'>
                    notes
                </Link>
                {user.name} is logged in{' '}
                <Button variant='secondary' onClick={handleLogout} size='sm'>
                    Logout
                </Button>
            </div>
            <Switch>
                <Route path='/users/:id'>
                    <User user={userMatch} />
                </Route>
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
        </div>
    )
}

export default App
