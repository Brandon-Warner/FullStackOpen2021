/* eslint-disable indent */
import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, setUpdate }) => {
    const [visible, setVisible] = useState(false)

    const blogStyle = {
        fontFamily: 'Montserrat, sansSerif',
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid 2px',
        borderWidth: 1,
        marginBottom: 5,
    }

    const buttonStyle = {
        fontFamily: 'Montserrat, sansSerif',
        backgroundColor: '#f7b1a3',
    }

    const like = async event => {
        event.preventDefault()
        const likes = blog.likes + 1
        const newBlog = { ...blog, likes }
        await blogService.update(blog.id, newBlog)
        setUpdate(Math.floor(Math.random() * 100))
    }

    if (!visible) {
        return (
            <div style={blogStyle} className='blog'>
                {blog.title} {blog.author}
                <button
                    style={buttonStyle}
                    onClick={() => setVisible(true)}
                    className='view'
                >
                    view
                </button>
            </div>
        )
    }
    return (
        <div style={blogStyle} className='blog'>
            {blog.title} {blog.author}{' '}
            <button style={buttonStyle} onClick={() => setVisible(false)}>
                hide
            </button>
            <br></br>
            {blog.url} <br></br>
            likes: {blog.likes}{' '}
            <button style={buttonStyle} onClick={like} className='like'>
                like
            </button>
            <br></br>
            {blog.user.name}
            <br></br>
            <button
                style={buttonStyle}
                onClick={() => {
                    if (
                        window.confirm(
                            `Are you sure you want to delete ${blog.title}?`
                        )
                    ) {
                        blogService.removeBlog(blog.id)
                    }
                }}
            >
                remove
            </button>
        </div>
    )
}
export default Blog
