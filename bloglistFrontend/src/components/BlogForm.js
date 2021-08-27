import React, { useState } from 'react'
import PropTypes from 'prop-types'

const buttonStyle = {
    fontFamily: 'Montserrat, sansSerif',
    backgroundColor: '#f7b1a3',
}

const textStyle = {
    fontFamily: 'Montserrat, sansSerif',
}

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
            <form style={textStyle} className='formDiv' onSubmit={addBlog}>
                Title:
                <input
                    style={textStyle}
                    type='text'
                    value={title}
                    className='title'
                    onChange={({ target }) => {
                        console.log('title:', target.value)
                        setTitle(target.value)
                    }}
                />
                <br></br>
                Author:
                <input
                    style={textStyle}
                    type='text'
                    value={author}
                    className='author'
                    onChange={({ target }) => {
                        console.log('author:', target.value)
                        setAuthor(target.value)
                    }}
                />
                <br></br>
                Url:
                <input
                    style={textStyle}
                    type='text'
                    value={url}
                    className='url'
                    onChange={({ target }) => {
                        console.log('url:', target.value)
                        setUrl(target.value)
                    }}
                />
                <br></br>
                <button style={buttonStyle} type='submit'>
                    Save Blog
                </button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
}

export default BlogForm
