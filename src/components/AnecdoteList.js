import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import {
    notificationChange,
    notificationRemoved,
} from '../reducers/notificationReducer'

const AnecdoteList = props => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = id => {
        console.log('vote', id)
        dispatch(addVote(id))
    }

    return (
        <div>
            {anecdotes
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
