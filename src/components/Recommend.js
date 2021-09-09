import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = ({ show }) => {
    const result = useQuery(ME)
    const booksResult = useQuery(ALL_BOOKS)

    if (!show) {
        return null
    }

    const user = result.data.me
    const books = booksResult.data.allBooks
    const booksToShow = books.filter(b => b.genres.includes(user.favoriteGenre))
    console.log('user: ', user)
    console.log('books: ', books)

    return (
        <div>
            <h2>Book Recommendations: </h2>
            <p>
                matches to your favorite genre <strong>{user.favoriteGenre}</strong>
            </p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {booksToShow.map(a => (
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

export default Recommend
