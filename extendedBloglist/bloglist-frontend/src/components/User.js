import React from 'react'
import { ListGroup } from 'react-bootstrap'

const User = ({ user }) => {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ margin: '5px 0' }}>{user.name}&apos;s Blogs</h2>
            <br />
            <ListGroup>
                {user.blogs.map(blog => (
                    <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default User
