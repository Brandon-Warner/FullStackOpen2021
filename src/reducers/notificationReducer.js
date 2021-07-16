export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            content,
        })
        setTimeout(() => {
            dispatch({
                type: 'NO_NOTIFICATION',
            })
        }, time * 1000)
    }
}

export const clearNotification = () => {
    return {
        type: 'NO_NOTIFICATION',
    }
}

const notificationReducer = (state = '', action) => {
    console.log('ACTION: ', action)
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.content
        case 'NO_NOTIFICATION':
            console.log('action: ', action)
            return ''
        default:
            return state
    }
}
export default notificationReducer
