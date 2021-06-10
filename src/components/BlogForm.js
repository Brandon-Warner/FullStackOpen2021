import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
            <h2>New Post</h2>
            <form>
                Title:
                <input
                    type='text'
                    value={title}
                    name='title'
                    onChange={({ target }) => {
                        console.log('title:', target.value)
                        setTitle(target.value)
                    }}
                />
                <br></br>
                Author:
                <input
                    type='text'
                    value={author}
                    name='author'
                    onChange={({ target }) => {
                        console.log('author:', target.value)
                        setAuthor(target.value)
                    }}
                />
                <br></br>
                Url:
                <input
                    type='text'
                    value={url}
                    name='url'
                    onChange={({ target }) => {
                        console.log('url:', target.value)
                        setUrl(target.value)
                    }}
                />
                <br></br>
                <button onClick={addBlog}>Save Blog</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
}

export default BlogForm
