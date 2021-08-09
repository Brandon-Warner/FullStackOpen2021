import React from 'react'

const Users = ({ users, user }) => {
    return (
        <div>
            <h1>Blogs</h1>
            <br />
            {user.name} is logged in
            <br />
            <h2>Users</h2>
            <br />
            <table>
                <thead>
                    <tr>
                        <td> </td>
                        <td>
                            <b>blogs created</b>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users
