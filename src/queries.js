import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            published
            author
        }
    }
`

export const NEW_BOOK = gql`
    mutation newBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            title
            author
            published
            genres
        }
    }
`

export const ADD_BORN = gql`
    mutation addBorn($name: String!, $born: Int!) {
        editAuthor(name: $name, setBornTo: $born) {
            name
            born
        }
    }
`
