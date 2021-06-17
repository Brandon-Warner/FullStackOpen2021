import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const [message, setMessage] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs => {
            blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1))
            setBlogs(blogs)
        }, [])
    })
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
        } catch (exception) {
            console.log('error', exception)
            setMessage('Wrong username or password')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
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
            <div>
                <h2>Please Log In</h2>
                <Notification message={message} />
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            type='text'
                            value={username}
                            name='Username'
                            onChange={({ target }) => setUsername(target.value)}
                        />
                        <br></br>
                        password
                        <input
                            type='text'
                            value={password}
                            name='Password'
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type='submit'>login</button>
                </form>
            </div>
        )
    }
    return (
        <div>
            <h2>blogs</h2>
            <Notification message={message} />
            <div>
                <p>{user.name} is logged in</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <Toggleable buttonLabel='new blog'>
                <BlogForm createBlog={addBlog} />
            </Toggleable>
            <h2>{user.name}&apos;s Blogs: </h2>
            {blogs.map(blog => {
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
