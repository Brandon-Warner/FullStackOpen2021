import { useQuery } from '@apollo/client'
import React from 'react'

import { ALL_BOOKS } from '../queries'

const Books = props => {
    // console.log(props)
    const result = useQuery(ALL_BOOKS)
    // console.log('books result: ', result)

    if (!props.show) {
        return null
    }

    const books = result.data.allBooks

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map(a => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Books
