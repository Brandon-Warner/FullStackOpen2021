import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = props => {
    const addAnecdote = async event => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
    }

    return (
        <form onSubmit={addAnecdote}>
            <input name='anecdote' />
            <button type='submit'>create</button>
        </form>
    )
}

const mapDispatchToProps = {
    createAnecdote,
}

const mapStateToProps = state => {
    return {
        anecdotes: state.anecdote,
    }
}

const ConnectedAnecdoteForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm