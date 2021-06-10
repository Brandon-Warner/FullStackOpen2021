import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid 2px',
        borderWidth: 1,
        marginBottom: 5,
    }

    if (visible === false) {
        return (
            <div style={blogStyle}>
                {blog.title} {blog.author}
                <button onClick={() => setVisible(true)}>view</button>
            </div>
        )
    }
    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}{' '}
            <button onClick={() => setVisible(false)}>hide</button>
            <br></br>
            {blog.url} <br></br>
            likes: {blog.likes}{' '}
            <button
                onClick={() => {
                    blogService.addLike(blog.id)
                }}
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
