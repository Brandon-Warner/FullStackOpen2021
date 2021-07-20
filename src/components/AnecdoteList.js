import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
    const vote = (content, id) => {
        props.addVote(id)
        props.setNotification(`you voted ${content}`, 5)
    }

    const filterStatus = filter => {
        if (props.filter === 'NONE') {
            return ' '
        }
        return filter.toLowerCase()
    }

    return (
        <div>
            {props.anecdotes
                .filter(a =>
                    a.content.toLowerCase().includes(filterStatus(props.filter))
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

const mapStateToProps = state => {
    return {
        anecdotes: state.anecdotes,
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
