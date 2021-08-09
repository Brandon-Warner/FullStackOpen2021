import React from 'react'
import Notification from './Notification'

const Home = ({ user }) => {
    return (
        <div className='container'>
            <h2>Blogs</h2>
            <Notification />
            <div>
                <p>
                    <em>{user.name} is logged in</em>
                </p>
            </div>
            <div>
                <p>Welcome to the BlogsList application.</p>
                <p>
                    Used to save blogs that you want to save for reading or save for personal use
                    later on.
                </p>
                <p>
                    Select Users to view blogs by user. Select Blogs to see the full list of
                    currently saved Blogs
                </p>
            </div>
        </div>
    )
}

export default Home
