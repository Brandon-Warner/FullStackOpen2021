const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
}

const counterReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'GOOD':
            const newState0 = {
                ...state,
                good: state.good + 1,
            }
            console.log('newState: ', newState0)
            state = newState0
            return state
        case 'OK':
            const newState1 = {
                ...state,
                ok: state.ok + 1,
            }
            console.log('newState: ', newState1)
            state = newState1
            return state
        case 'BAD':
            const newState2 = {
                ...state,
                bad: state.bad + 1,
            }
            console.log('newState: ', newState2)
            state = newState2
            return state
        case 'ZERO':
            return state
        case 'RESET':
            state = initialState
            return state
        default:
            return state
    }
}

export default counterReducer
