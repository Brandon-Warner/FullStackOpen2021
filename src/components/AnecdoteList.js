import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import {
    notificationChange,
    notificationRemoved,
} from '../reducers/notificationReducer'

const AnecdoteList = props => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = id => {
        dispatch(addVote(id))
    }

    const filterStatus = filter => {
        if (filter === 'NONE') {
            return ' '
        }
        return filter
    }

    return (
        <div>
            {anecdotes
                .filter(a =>
                    a.content.includes(filterStatus(filter)) ? a : ''
                )
                .sort((a, b) => (a.votes > b.votes ? -1 : 1))
                .map(anecdote => (
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button
                                onClick={() => {
                                vote(anecdote.id)
                                    dispatch(
                                        notificationChange(anecdote.content)
                                    )
                                    setTimeout(() => {
                                        dispatch(notificationRemoved())
                                    }, 5000)
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
