import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import { Button } from 'react-bootstrap'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs))
    }, [blogs])

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

            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
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

    const addBlog = blogObject => {
        blogService.create(blogObject).then(returnedBlog => {
            setBlogs(blogs.concat(returnedBlog))
        })
    }

    if (user === null) {
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
    return (
        <div className='container'>
            <h2>Blogs</h2>
            <Notification />
            <div>
                <p>{user.name} is logged in</p>
                <Button variant='primary' onClick={handleLogout}>
                    Logout
                </Button>
            </div>
            <Toggleable buttonLabel='New Blog'>
                <BlogForm createBlog={addBlog} />
            </Toggleable>
            <h2>{user.name}&apos;s Blogs: </h2>
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map(blog => {
                    if (blog.user.username === user.username) {
                        return <Blog key={blog.id} blog={blog} />
                    } else {
                        return null
                    }
                })}
        </div>
    )
}

export default App
