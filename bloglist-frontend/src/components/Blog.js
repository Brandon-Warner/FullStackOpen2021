/* eslint-disable indent */
import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer'
import useField from '../hooks/hooks'

import { Button, Form, ListGroup } from 'react-bootstrap'

const Blog = ({ blog }) => {
    const comment = useField('text')

    const dispatch = useDispatch()

    const like = blogId => {
        dispatch(likeBlog(blogId))
    }
    const removeBlog = blogId => dispatch(deleteBlog(blogId))

    const newComment = event => {
        event.preventDefault()
        const updatedBlog = {
            ...blog,
            comments: [...blog.comments, comment.effect.value],
        }
        dispatch(addComment(updatedBlog))
        comment.reset()
    }

    return (
        <div className='container'>
            <h1>Blogs</h1>
            <br />

            {blog !== undefined ? (
                <div>
                    <div>
                        <h2>{blog.title}</h2>
                        <p>by {blog.author}</p>
                        <br />
                    </div>
                    <div>
                        <a href={`${blog.url}`}>{blog.url}</a>
                        <br />
                    </div>
                    <div>
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
                    </div>
                    <br></br>
                    <br></br>
                    <div>
                        <em>added by: </em>
                        {blog.user.name}
                        <br></br>
                    </div>
                    <div>
                        <Button
                            variant='danger'
                            size='sm'
                            onClick={() => {
                                if (
                                    window.confirm(`Are you sure you want to delete ${blog.title}?`)
                                ) {
                                    removeBlog(blog.id)
                                }
                            }}
                        >
                            remove
                        </Button>
                        <br />
                        <br />
                    </div>
                    <div>
                        <h3>Comments</h3>
                        <div>
                            <Form onSubmit={newComment}>
                                <Form.Group className='comments'>
                                    <Form.Label>add comment:</Form.Label>
                                    <Form.Control
                                        {...comment.effect}
                                        placeholder='new comment'
                                        className='comment-input'
                                    />
                                    <Button
                                        variant='outline-info'
                                        size='sm'
                                        type='submit'
                                        style={{ margin: 3 }}
                                    >
                                        add
                                    </Button>
                                </Form.Group>
                            </Form>
                        </div>
                        <ListGroup variant='flush'>
                            {blog.comments.map(comment => (
                                <ListGroup.Item key={comment}>{comment}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </div>
            ) : (
                <div>Blog has been deleted.</div>
            )}
        </div>
    )
}

export default Blog
