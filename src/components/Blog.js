import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid 2px',
        borderWidth: 1,
        marginBottom: 5,
    }

    if (!visible) {
        return (
            <div style={blogStyle} className='blog'>
                {blog.title} {blog.author}
                <button onClick={toggleVisibility} className='view'>
                    view
                </button>
            </div>
        )
    }
    return (
        <div style={blogStyle} className='blog'>
            {blog.title} {blog.author}{' '}
            <button onClick={toggleVisibility}>hide</button>
            <br></br>
            {blog.url} <br></br>
            likes: {blog.likes}{' '}
            <button
                onClick={() => blogService.addLike(blog.id)}
                className='like'
            >
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
                    }
                }}
            >
                remove
            </button>
        </div>
    )
}
export default Blog
