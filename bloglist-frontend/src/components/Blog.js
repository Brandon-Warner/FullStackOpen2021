/* eslint-disable indent */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { Button } from 'react-bootstrap'

const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false)

    const dispatch = useDispatch()

    const like = blogId => {
        dispatch(likeBlog(blogId))
    }
    const removeBlog = blogId => dispatch(deleteBlog(blogId))

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
            <Button
                variant='success'
                size='sm'
                onClick={() => like(blog.id)}
                className='like'
            >
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
                        removeBlog(blog.id)
                    }
                }}
            >
                remove
            </Button>
        </div>
    )
}
export default Blog
