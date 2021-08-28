/* eslint-disable indent */
export const setNotification = message => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: message,
        })
        setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION',
            })
        }, 5000)
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION',
        data: null,
    }
}

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'REMOVE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export default notificationReducer
