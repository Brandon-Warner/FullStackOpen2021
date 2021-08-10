import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = ({ users, user }) => {
    return (
        <div className='container'>
            <h1>Blogs</h1>
            <br />
            {user.name} is logged in
            <br />
            <h2>Users</h2>
            <br />
            <Table striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <td>
                            <b>users</b>
                        </td>
                        <td>
                            <b>blogs created</b>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`}>{user.name}</Link>
                            </td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Users
