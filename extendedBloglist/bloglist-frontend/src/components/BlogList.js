import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, user }) => {
    return (
        <div>
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map(blog => {
                    if (blog.user === user.id || blog.user.id === user.id)
                        return <Blog key={blog.id} blog={blog} user={user} />
                })}
        </div>
    )
}

export default BlogList
