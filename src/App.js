import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
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
        console.log('logging in with', username, password)
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
        } catch (exception) {}
    }
    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }
    if (user === null) {
        return (
            <div>
                <h2>Please Log In</h2>
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
                        onChange={target => setTitle(target.value)}
                    />
                    <br></br>
                    Author:
                    <input
                        type='text'
                        value={author}
                        name='author'
                        onChange={target => setAuthor(target.value)}
                    />
                    <br></br>
                    Url:
                    <input
                        type='text'
                        value={url}
                        name='url'
                        onChange={target => setUrl(target.value)}
                    />
                    <br></br>
                    <button>Submit Blog</button>
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
