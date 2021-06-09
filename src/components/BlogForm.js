import React from 'react'

const BlogForm = ({
    title,
    author,
    url,
    setTitle,
    setAuthor,
    setUrl,
    handleSubmit,
}) => {
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
                <button onClick={handleSubmit}>Submit Blog</button>
            </form>
        </div>
    )
}

export default BlogForm
