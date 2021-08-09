import React from 'react'
import Toggleable from './Toggleable'
import BlogForm from './BlogForm'

import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {
    return (
        <div>
            <h1>Blogs</h1>
            <br />
            <Toggleable buttonLabel='New Blog'>
                <BlogForm />
            </Toggleable>
            <br />
            <ul>
                {blogs.map(blog => (
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Blogs
