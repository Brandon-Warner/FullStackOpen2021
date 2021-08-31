const { ApolloServer, gql, UserInputError } = require('apollo-server')

require('dotenv').config()

const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')

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
        bookCount: async root => {
            const author = await Author.findOne({ name: root.name })
            const books = await Books.findOne({ author: author.id })
            return books.length
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
            let author = await Author.findOne({ name: args.name })
            if (!author) {
                throw new UserInputError('Author does not exist', {
                    invalidArgs: args
                })
            }
            const filter = { name: args.name }
            const updateDoc = {
                $set: {
                    born: args.setBornTo
                }
            }
            const options = {}

            try {
                await Author.updateOne(filter, updateDoc, options)
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
            return await Author.findOne({ name: args.name })
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
