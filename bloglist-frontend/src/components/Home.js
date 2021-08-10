import React from 'react'
import Notification from './Notification'

import { Card } from 'react-bootstrap'

const Home = ({ user }) => {
    return (
        <div>
            <div>
                <Notification />
            </div>
            <div className='container'>
                <br />
                <div>
                    <p>
                        <em>{user.name} is logged in</em>
                    </p>
                </div>
                <div>
                    <Card body>
                        <p>Welcome to the BlogsList application.</p>
                        <p>Save blogs that you have not read or for personal use later on.</p>
                    </Card>
                    <Card body>
                        <p>
                            To view blogs by user: select <em>Users</em>. To see the full list of
                            currently saved Blogs: select <em>Blogs</em>.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Home
