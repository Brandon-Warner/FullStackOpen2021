import { createStore, combineReducers } from 'redux'
import anecdoteReducer, { createAnecdote } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { notificationChange } from './reducers/notificationReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
})

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

console.log(store.getState())

// store.subscribe(() => console.log(store.getState()))
// store.dispatch(notificationChange('SET_NOTIFICATION'))
// store.dispatch(createAnecdote('blahblahblahlbah'))

export default store
