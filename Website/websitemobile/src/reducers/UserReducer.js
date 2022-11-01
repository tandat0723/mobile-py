const UserReducer = (user, action) => {
    switch (action.type) {
        case "LOGIN":
            return action.payload
        case "LOGOUT":
            return null
    }
    return user
}

export default UserReducer