export const createAnecdote = data => {
    return {
        type: 'NEW_ANECDOTE',
        data,
    }
}

export const addVote = id => {
    return {
        type: 'ADD_VOTE',
        data: { id },
    }
}

export const initializeAnecdotes = anecdotes => {
    return {
        type: 'INIT_ANECDOTES',
        data: anecdotes,
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
