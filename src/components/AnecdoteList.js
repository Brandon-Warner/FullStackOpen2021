import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = (content, id) => {
        dispatch(addVote(id))
        dispatch(setNotification(`you voted ${content}`, 5))
    }

    const filterStatus = filter => {
        if (filter === 'NONE') {
            return ' '
        }
        return filter.toLowerCase()
    }

    return (
        <div>
            {anecdotes
                .filter(a =>
                    a.content.toLowerCase().includes(filterStatus(filter))
                        ? a
                        : ''
                )
                .sort((a, b) => (a.votes > b.votes ? -1 : 1))
                .map(anecdote => (
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button
                                onClick={() => {
                                    vote(anecdote.content, anecdote.id)
                                }}
                            >
                                vote
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default AnecdoteList
