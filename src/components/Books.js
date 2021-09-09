import { useQuery } from '@apollo/client'
import React, { useState } from 'react'

import { ALL_BOOKS } from '../queries'

const Books = props => {
    const [genreFilter, setGenreFilter] = useState('')
    let allGenres = []
    let uniqueGenres = []

    const result = useQuery(ALL_BOOKS)

    if (!props.show) {
        return null
    }

    const books = result.data.allBooks

    const getGenres = books => {
        books.forEach(book => {
            book.genres.forEach(genre => {
                allGenres.push(genre)
            })
        })
        return allGenres
    }
    getGenres(books)

    uniqueGenres = [...new Set(allGenres)]

    console.log('allGenres: ', allGenres)
    console.log('uniqueGenres: ', uniqueGenres)

    const booksToShow = books.filter(b => (b.genres.includes(genreFilter) ? b : null))

    console.log('Genre Filter: ', genreFilter)

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
                    {(genreFilter === '' ? books : booksToShow).map(a => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {uniqueGenres.map(genre => (
                    <button key={genre} onClick={() => setGenreFilter(genre)}>
                        {genre}
                    </button>
                ))}
                <button onClick={() => setGenreFilter('')}>reset filter</button>
            </div>
        </div>
    )
}

export default Books
