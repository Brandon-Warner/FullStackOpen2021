import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
    const vote = (content, id) => {
        props.addVote(id)
        props.setNotification(`you voted ${content}`, 5)
    }

    return (
        <div>
            {props.visibleAnecdotes.map(anecdote => (
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

const anecdotesToShow = ({ anecdotes, filter }) => {
    const anecdotesSorted = [...anecdotes].sort((a, b) =>
        a.votes > b.votes ? -1 : 1
    )

    if (filter === 'NONE') {
        return anecdotesSorted
    }
    return anecdotesSorted.filter(a =>
        a.content.toLowerCase().includes(filter.toLowerCase())
    )
}

const mapStateToProps = state => {
    return {
        visibleAnecdotes: anecdotesToShow(state),
        filter: state.filter,
    }
}

const mapDispatchToProps = {
    setNotification,
    addVote,
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
