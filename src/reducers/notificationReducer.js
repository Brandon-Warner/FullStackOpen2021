const notificationReducer = (state = '', action) => {
    console.log('ACTION: ', action)
    switch (action.type) {
        case 'SET_NOTIFICATION':
            state = action.content
            return state
        case 'NO_NOTIFICATION':
            state = ''
            return state
        default:
            return state
    }
}

export const notificationChange = content => {
    return {
        type: 'SET_NOTIFICATION',
        content,
    }
}

export const notificationRemoved = () => {
    return {
        type: 'NO_NOTIFICATION',
    }
}

export default notificationReducer
