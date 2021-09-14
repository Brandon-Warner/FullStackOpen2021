import { useLazyQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'

import { FAV_GENRE_BOOK } from '../queries'

const Books = ({ genres, show, books }) => {
    const [booksToShow, setBooksToShow] = useState(books)

    const [getBooks, result] = useLazyQuery(FAV_GENRE_BOOK)

    useEffect(() => {
        if (result.data) {
            setBooksToShow(result.data.allBooks)
        }
    }, [result, setBooksToShow])

    const setBooks = genre => {
        getBooks({ variables: { genre: genre } })
    }

    if (!show) {
        return null
    }

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
                    {booksToShow.map(a => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {genres.map(genre => (
                    <button key={genre} onClick={() => setBooks(genre)}>
                        {genre}
                    </button>
                ))}
                <button onClick={() => setBooksToShow(books)}>reset filter</button>
            </div>
        </div>
    )
}

export default Books
