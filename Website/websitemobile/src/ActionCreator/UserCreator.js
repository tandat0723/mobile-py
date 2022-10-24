const UserCreator = (payload) =>{
    return {
        'type': 'LOGIN',
        'payload': payload
    }
}

export default UserCreator
