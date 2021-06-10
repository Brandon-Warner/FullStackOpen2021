import React, { useState } from 'react'
const Blog = ({ blog }) => {
    // console.log('blog:', blog)
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    if (visible === false) {
        return (
            <div style={hideWhenVisible}>
                {blog.title} {blog.author}
                <button onClick={() => setVisible(true)}>view</button>
            </div>
        )
    }
    return (
        <div style={showWhenVisible}>
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
