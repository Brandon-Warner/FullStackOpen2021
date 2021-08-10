/* eslint-disable indent */
import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { Button, ListGroup } from 'react-bootstrap'

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

            {blog !== undefined ? (
                <div>
                    <h2>{blog.title}</h2>
                    <p>by {blog.author}</p>
                    <br />
                    <br />
                    <a href={`${blog.url}`}>{blog.url}</a>
                    <br />
                    <em>likes: </em>
                    {blog.likes}{' '}
                    <Button
                        variant='success'
                        size='sm'
                        onClick={() => like(blog.id)}
                        className='like'
                    >
                        like
                    </Button>
                    <br></br>
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
                    <br />
                    <br />
                    <h3>Comments</h3>
                    <ListGroup variant='flush'>
                        {blog.comments.map(comment => (
                            <ListGroup.Item key={comment}>{comment}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            ) : (
                <div>Blog has been deleted.</div>
            )}
        </div>
    )
}

export default Blog
