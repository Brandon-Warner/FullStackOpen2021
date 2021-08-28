/* eslint-disable indent */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer'
import useField from '../hooks/hooks'

import { Button, Form, ListGroup } from 'react-bootstrap'

const Blog = ({ blog }) => {
    const comment = useField('text')
    const users = useSelector(state => state.users)

    const dispatch = useDispatch()

    const like = blogId => {
        dispatch(likeBlog(blogId))
    }
    const removeBlog = blogId => dispatch(deleteBlog(blogId))

    const newComment = event => {
        event.preventDefault()
        const updatedBlog = {
            ...blog,
            comments: [...blog.comments, comment.effect.value]
        }
        dispatch(addComment(updatedBlog))
        comment.reset()
    }

    return (
        <div style={{ maxWidth: '800px' }} className='container'>
            {blog !== undefined ? (
                <div>
                    <div style={{ margin: '5px 0' }}>
                        <h2>{blog.title}</h2>
                        <p>by {blog.author}</p>
                    </div>
                    <div>
                        <a href={`${blog.url}`}>{blog.url}</a>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr' }}>
                        <div style={{ margin: '10px 0' }}>
                            <p>
                                <em>added by: </em>
                                {blog.user.name === undefined
                                    ? users.filter(u => u.id === blog.user).map(u => u.name)
                                    : blog.user.name}
                            </p>
                        </div>
                        <div style={{ margin: '5px 0' }}>
                            <em>likes: </em>
                            {blog.likes}{' '}
                            <Button
                                variant='success'
                                size='sm'
                                onClick={() => like(blog.id)}
                                className='like'
                                style={{ margin: '5px 0' }}
                            >
                                like
                            </Button>
                        </div>

                        <div style={{ margin: '8px 0' }}>
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
                            <br />
                            <br />
                        </div>
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
                                        style={{ margin: '5px 0' }}
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
