import React from 'react'
import Notification from './Notification'

import { Card } from 'react-bootstrap'

const cardStyle = {
    margin: '0 auto',
    maxWidth: '800px'
}

const Home = () => {
    return (
        <div>
            <div>
                <Notification style={{ margin: '0 auto' }} />
            </div>
            <div className='container'>
                <br />
                <div style={{ margin: '0 auto' }}>
                    <Card body style={cardStyle}>
                        <p><strong>Welcome to the Bloglist application.</strong></p>
                        <p>Keep track of your favorite blogs!</p>
                        <p>See what other users are reading!</p>
                    </Card>
                    <Card body style={cardStyle}>
                        <br />
                        <p>
                            To view blogs by user: select <em>Users</em>.
                        </p>
                        <br />
                        <p>
                            To see the full list of currently saved Blogs: select <em>Blogs</em>.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Home
