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
            author {
                name
            }
        }
    }
`

export const NEW_BOOK = gql`
    mutation newBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            title
            author{
                name
            }
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

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`
