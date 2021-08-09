/* eslint-disable indent */
import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { Button } from 'react-bootstrap'

const Blog = ({ blog }) => {
    const dispatch = useDispatch()
    const like = blogId => {
        dispatch(likeBlog(blogId))
    }
    const removeBlog = blogId => dispatch(deleteBlog(blogId))

    return (
        <div>
            <h1>Blogs</h1>
            <br />
            <div>
                <h2>{blog.title}</h2>
                by {blog.author}
                <br />
                <br />
                <a href={`${blog.url}`}>{blog.url}</a>
                <br />
                <em>likes: </em>
                {blog.likes}{' '}
                <Button variant='success' size='sm' onClick={() => like(blog.id)} className='like'>
                    like
                </Button>
                <br></br>
                <em>added by: </em>
                {blog.user.name}
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
