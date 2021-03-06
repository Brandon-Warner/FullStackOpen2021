/* eslint-disable indent */
import userService from '../services/users'

export const initializeUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: 'INIT_USERS',
            data: users,
        })
    }
}

const userReducer = (state = [], action) => {
    console.log('ACTION DATA:', action.data)
    switch (action.type) {
        case 'INIT_USERS':
            return action.data
        default:
            return state
    }
}

export default userReducer
