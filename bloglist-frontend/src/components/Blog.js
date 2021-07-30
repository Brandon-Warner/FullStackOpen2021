/* eslint-disable indent */
import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, setUpdate }) => {
    const [visible, setVisible] = useState(false)

    const like = async event => {
        event.preventDefault()
        const likes = blog.likes + 1
        const newBlog = { ...blog, likes }
        await blogService.update(blog.id, newBlog)
        setUpdate(Math.floor(Math.random() * 100))
    }

    if (!visible) {
        return (
            <div className='blog'>
                {blog.title} {blog.author}
                <button onClick={() => setVisible(true)} className='view'>
                    view
                </button>
            </div>
        )
    }
    return (
        <div className='blog'>
            {blog.title} {blog.author}{' '}
            <button onClick={() => setVisible(false)}>hide</button>
            <br></br>
            {blog.url} <br></br>
            likes: {blog.likes}{' '}
            <button onClick={like} className='like'>
                like
            </button>
            <br></br>
            {blog.user.name}
            <br></br>
            <button
                onClick={() => {
                    if (
                        window.confirm(
                            `Are you sure you want to delete ${blog.title}?`
                        )
                    ) {
                        blogService.removeBlog(blog.id)
                        setUpdate(Math.floor(Math.random() * 100))
                    }
                }}
            >
                remove
            </button>
        </div>
    )
}
export default Blog
