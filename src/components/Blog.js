import React from 'react'
const Blog = ({ blog }) => {
    // console.log('blog:', blog)
    return (
        <div>
            {blog.title} {blog.author}
        </div>
    )
}
export default Blog
