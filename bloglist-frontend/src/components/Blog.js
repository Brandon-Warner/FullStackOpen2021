/* eslint-disable indent */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, user }) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const dispatch = useDispatch()
    const like = blogId => {
        dispatch(likeBlog(blogId))
    }
    const removeBlog = blogId => dispatch(deleteBlog(blogId))

    return (
        <div>
            <div className='blog'>
                <div style={hideWhenVisible}>
                    <div>
                        {blog.title}
                        <br />
                        by: {blog.author}
                    </div>
                    <Button
                        variant='info'
                        size='sm'
                        onClick={() => setVisible(true)}
                        className='view'
                    >
                        view
                    </Button>
                </div>
            </div>
            <div style={showWhenVisible}>
                {blog.title} {blog.author}
                <Button variant='secondary' size='sm' onClick={() => setVisible(false)}>
                    hide
                </Button>
                <br />
                {blog.url} <br />
                likes: {blog.likes}{' '}
                <Button variant='success' size='sm' onClick={() => like(blog.id)} className='like'>
                    like
                </Button>
                <br></br>
                {blog.user.name || user.name}
                <br></br>
                <Button
                    variant='danger'
                    size='sm'
                    onClick={() => {
                        if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
                            removeBlog(blog.id)
                        }
                    }}
                >
                    remove
                </Button>
            </div>
        </div>
    )
}

export default Blog
