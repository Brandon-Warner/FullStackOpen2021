import React from 'react'
import Toggleable from './Toggleable'
import BlogForm from './BlogForm'

import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blogs = ({ blogs }) => {
    return (
        <div className='container'>
            <h1>Blogs</h1>
            <br />
            <Toggleable buttonLabel='New Blog'>
                <BlogForm />
            </Toggleable>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Blog Title</th>
                        <th>Author</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map(blog => (
                        <tr key={blog.id}>
                            <td>
                                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                            </td>
                            <td>{blog.author}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Blogs
