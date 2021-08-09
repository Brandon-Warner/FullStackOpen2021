import React from 'react'

const Users = ({ users }) => {
    return (
        <div>
            <h1>Users</h1>
            <br />
            <table>
                <thead>
                    <tr>
                        <td> </td>
                        <td>blogs created</td>
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