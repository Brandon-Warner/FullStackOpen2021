import React, { useState } from 'react'
const Blog = ({ blog }) => {
    // console.log('blog:', blog)
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
            likes: {blog.likes} <button>like</button>
            <br></br>
            {blog.user.name}
        </div>
    )
}
export default Blog
