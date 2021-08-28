const filterReducer = (state = 'NONE', action) => {
    console.log('ACTION: ', action)
    switch (action.type) {
        case 'FILTERING':
            return action.filter
        case 'NONE':
            return state
        default:
            return state
    }
}

export const filterChange = filter => {
    return {
        type: 'FILTERING',
        filter,
    }
}

export default filterReducer
