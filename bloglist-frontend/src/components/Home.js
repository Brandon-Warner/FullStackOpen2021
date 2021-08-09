import React from 'react'
import Notification from './Notification'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Toggleable from './Toggleable'

const Home = ({ user, blogs  }) => {
    return (
        <div className='container'>
            <h2>Blogs</h2>
            <Notification />
            <div>
                <p>{user.name} is logged in</p>
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
