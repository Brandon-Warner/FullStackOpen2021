const { ApolloServer, gql, UserInputError } = require('apollo-server')

require('dotenv').config()

const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')

// let authors = [
//     {
//         name: 'Robert Martin',
//         id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
//         born: 1952
//     },
//     {
//         name: 'Martin Fowler',
//         id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
//         born: 1963
//     },
//     {
//         name: 'Fyodor Dostoevsky',
//         id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
//         born: 1821
//     },
//     {
//         name: 'Joshua Kerievsky', // birthyear not known
//         id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e'
//     },
//     {
//         name: 'Sandi Metz', // birthyear not known
//         id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e'
//     }
// ]

// let books = [
//     {
//         title: 'Clean Code',
//         published: 2008,
//         author: 'Robert Martin',
//         id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
//         genres: ['refactoring']
//     },
//     {
//         title: 'Agile software development',
//         published: 2002,
//         author: 'Robert Martin',
//         id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
//         genres: ['agile', 'patterns', 'design']
//     },
//     {
//         title: 'Refactoring, edition 2',
//         published: 2018,
//         author: 'Martin Fowler',
//         id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
//         genres: ['refactoring']
//     },
//     {
//         title: 'Refactoring to patterns',
//         published: 2008,
//         author: 'Joshua Kerievsky',
//         id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
//         genres: ['refactoring', 'patterns']
//     },
//     {
//         title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//         published: 2012,
//         author: 'Sandi Metz',
//         id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
//         genres: ['refactoring', 'design']
//     },
//     {
//         title: 'Crime and punishment',
//         published: 1866,
//         author: 'Fyodor Dostoevsky',
//         id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
//         genres: ['classic', 'crime']
//     },
//     {
//         title: 'The Demon ',
//         published: 1872,
//         author: 'Fyodor Dostoevsky',
//         id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
//         genres: ['classic', 'revolution']
//     }
// ]

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to ', MONGODB_URI)

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB: ', error.message)
    })

const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    input AuthorInput {
        name: String!
        born: Int
    }

    type Author {
        name: String!
        born: String
        bookCount: Int!
        id: ID!
    }

    enum YesNo {
        YES
        NO
    }

    type Query {
        bookCount: Int!
        authorCount: Int!

        allBooks(author: YesNo, genre: YesNo): [Book!]!
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(title: String!, author: AuthorInput!, published: Int!, genres: [String!]): Book
        editAuthor(name: String!, setBornTo: Int!): Author
    }
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => {
            if (!args.author && !args.genre) {
                return books
            } else if (args.author === 'YES') {
                return books.filter(b => b.author === args.author)
            } else if (args.genre === 'YES') {
                return books.filter(b => b.genres.includes(args.genre))
            }
        },
        allAuthors: () => Author.find({})
    },
    Author: {
        bookCount: root => {
            let count = 0
            authorBooks = books.filter(b => b.author === root.name)
            count = authorBooks.length
            return count
        }
    },
    Mutation: {
        addBook: async (root, args) => {
            const foundBook = await Book.findOne({ title: args.title })
            const foundAuthor = await Author.findOne({ name: args.author.name })

            if (foundBook) {
                throw new UserInputError('Book already exists', {
                    invalidArgs: args
                })
            }

            if (!foundAuthor) {
                const author = new Author({ ...args.author })
                try {
                    await author.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                }
            }

            const foundAuthor2 = await Author.findOne({ name: args.author.name })
            const book = new Book({ ...args, author: foundAuthor2 })

            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }

            return book
        },
        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name })
            if (!author) {
                throw new UserInputError('Author does not exist', {
                    invalidArgs: args
                })
            }

            const updatedAuthor = { ...author, born: args.setBornto }

            try {
                await updatedAuthor.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
            return updatedAuthor
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
