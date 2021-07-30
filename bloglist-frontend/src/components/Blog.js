/* eslint-disable indent */
import React, { useState } from 'react'
import blogService from '../services/blogs'
import { Button } from 'react-bootstrap'

const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false)

    const like = async event => {
        event.preventDefault()
        const likes = blog.likes + 1
        const newBlog = { ...blog, likes }
        await blogService.update(blog.id, newBlog)
    }

    if (!visible) {
        return (
            <div className='blog'>
                {blog.title} {blog.author}
                <Button
                    variant='info'
                    size='sm'
                    onClick={() => setVisible(true)}
                    className='view'
                >
                    view
                </Button>
            </div>
        )
    }
    return (
        <div className='blog'>
            {blog.title} {blog.author}{' '}
            <Button
                variant='secondary'
                size='sm'
                onClick={() => setVisible(false)}
            >
                hide
            </Button>
            <br></br>
            {blog.url} <br></br>
            likes: {blog.likes}{' '}
            <Button variant='success' size='sm' onClick={like} className='like'>
                like
            </Button>
            <br></br>
            {blog.user.name}
            <br></br>
            <Button
                variant='danger'
                size='sm'
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
            </Button>
        </div>
    )
}
export default Blog
