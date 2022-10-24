const LogoutUser = (payload=null) => {
    return {
        'type': 'LOGOUT',
        'payload': payload
    }
}

export default LogoutUser