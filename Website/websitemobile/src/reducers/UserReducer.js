import cookies from 'react-cookies'

const init = {
    'user': cookies.load('user')
}

const UserReducer = (state=init, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                'user': action.payload,
            }
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export default UserReducer