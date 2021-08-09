import React from 'react'
import Notification from './Notification'

const Home = ({ user }) => {
    return (
        <div className='container'>
            <Notification />
            <h2>Blogs</h2>
            <br />
            <div>
                <p>
                    <em>{user.name} is logged in</em>
                </p>
            </div>
            <div>
                <p>Welcome to the BlogsList application.</p>
                <p>Save blogs that you have not read or for personal use later on.</p>
                <p>
                    To view blogs by user: select <em>Users</em>. To see the full list of currently
                    saved Blogs: select <em>Blogs</em>.
                </p>
            </div>
        </div>
    )
}

export default Home
