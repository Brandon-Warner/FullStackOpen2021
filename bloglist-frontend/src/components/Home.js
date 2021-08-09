import React from 'react'
import Notification from './Notification'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Toggleable from './Toggleable'

import { Button } from 'react-bootstrap'

const Home = ({ user, blogs, handleLogout }) => {
    return (
        <div className='container'>
            <h2>Blogs</h2>
            <Notification />
            <div>
                <p>{user.name} is logged in</p>
                <Button variant='primary' onClick={handleLogout}>
                    Logout
                </Button>
            </div>
            <Toggleable buttonLabel='New Blog'>
                <BlogForm />
            </Toggleable>
            <h2>{user.name}&apos;s Blogs: </h2>
            <BlogList blogs={blogs} user={user} />
        </div>
    )
}

export default Home
