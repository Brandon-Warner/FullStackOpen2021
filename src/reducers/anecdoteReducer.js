import anecdoteService from '../services/anecdotes'

export const createAnecdote = content => {
    return async dispatch => {
        const newNote = await anecdoteService.createNew(content)
        dispatch({
            type: 'NEW_ANECDOTE',
            data: newNote,
        })
    }
}

export const addVote = id => {
    return {
        type: 'ADD_VOTE',
        data: { id },
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes,
        })
    }
}

const anecdoteReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_ANECDOTES':
            return action.data
        case 'ADD_VOTE':
            const id = action.data.id
            const anecdoteToChange = state.find(a => a.id === id)

            const changedAnecdote = {
                ...anecdoteToChange,
                votes: anecdoteToChange.votes + 1,
            }

            return state.map(anecdote =>
                anecdote.id !== id ? anecdote : changedAnecdote
            )
        case 'NEW_ANECDOTE':
            return [...state, action.data]

        default:
            return state
    }
}

export default anecdoteReducer
