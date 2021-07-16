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
    return async dispatch => {
        const newVote = await anecdoteService.vote(id)
        dispatch({
            type: 'ADD_VOTE',
            data: newVote,
        })
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
            const index = state.findIndex(a => a.id === action.data.id)
            return [
                ...state.slice(0, index),
                action.data,
                ...state.slice(index + 1),
            ]
        case 'NEW_ANECDOTE':
            return [...state, action.data]

        default:
            return state
    }
}

export default anecdoteReducer
