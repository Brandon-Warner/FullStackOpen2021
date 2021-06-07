import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs))
    }, [])

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
    const handleSubmit = async event => {
        event.preventDefault()
        try {
            const blogObject = {
                title,
                author,
                url,
            }
            blogService.postBlog(blogObject)
            setMessage(`${user.name} added blog ${title}`)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (exception) {
            console.log('error', exception)
        }
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
            <div>
                <h2>New Post</h2>
                <form>
                    Title:
                    <input
                        type='text'
                        value={title}
                        name='title'
                        onChange={({ target }) => {
                            console.log('title:', target.value)
                            setTitle(target.value)
                        }}
                    />
                    <br></br>
                    Author:
                    <input
                        type='text'
                        value={author}
                        name='author'
                        onChange={({ target }) => {
                            console.log('author:', target.value)
                            setAuthor(target.value)
                        }}
                    />
                    <br></br>
                    Url:
                    <input
                        type='text'
                        value={url}
                        name='url'
                        onChange={({ target }) => {
                            console.log('url:', target.value)
                            setUrl(target.value)
                        }}
                    />
                    <br></br>
                    <button onClick={handleSubmit}>Submit Blog</button>
                </form>
            </div>
            <h2>{user.name}'s Blogs: </h2>
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
