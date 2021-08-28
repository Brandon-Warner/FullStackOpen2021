import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = props => {
    // const dispatch = useDispatch()

    const handleChange = event => {
        event.preventDefault()
        const filter = event.target.value
        props.filterChange(filter)
    }
    const style = {
        marginBottom: 10,
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = {
    filterChange,
}

const mapStateToProps = state => {
    return {
        filter: state.filter,
    }
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default ConnectedFilter
