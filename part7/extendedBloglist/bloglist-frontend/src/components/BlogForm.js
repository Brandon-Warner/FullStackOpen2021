import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'
import useField from '../hooks/hooks'

const BlogForm = () => {
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')

    const dispatch = useDispatch()

    const addBlog = event => {
        event.preventDefault()
        const content = {
            title: title.effect.value,
            author: author.effect.value,
            url: url.effect.value,
        }
        dispatch(createBlog(content))
        title.reset()
        author.reset()
        url.reset()
    }

    return (
        <div>
            <h2>New Blog</h2>
            <Form className='formDiv' onSubmit={addBlog}>
                <Form.Group>
                    <Form.Label>Title:</Form.Label>

                    <Form.Control {...title.effect} className='title' />
                    <Form.Label>Author:</Form.Label>

                    <Form.Control {...author.effect} className='author' />
                    <Form.Label>Url:</Form.Label>

                    <Form.Control {...url.effect} className='url' />
                    <br></br>
                    <Button variant='primary' type='submit'>
                        Save Blog
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default BlogForm
