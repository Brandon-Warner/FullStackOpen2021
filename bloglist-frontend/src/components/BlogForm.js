import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = event => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>New Blog</h2>
            <Form className='formDiv' onSubmit={addBlog}>
                <Form.Group>
                    <Form.Label>Title:</Form.Label>

                    <Form.Control
                        type='text'
                        value={title}
                        className='title'
                        onChange={({ target }) => {
                            console.log('title:', target.value)
                            setTitle(target.value)
                        }}
                    />
                    <Form.Label>Author:</Form.Label>

                    <Form.Control
                        type='text'
                        value={author}
                        className='author'
                        onChange={({ target }) => {
                            console.log('author:', target.value)
                            setAuthor(target.value)
                        }}
                    />
                    <Form.Label>Url:</Form.Label>

                    <Form.Control
                        type='text'
                        value={url}
                        className='url'
                        onChange={({ target }) => {
                            console.log('url:', target.value)
                            setUrl(target.value)
                        }}
                    />
                    <br></br>
                    <Button variant='primary' type='submit'>
                        Save Blog
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
}

export default BlogForm
