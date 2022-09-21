import cookies from 'react-cookies'
import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import Api, { endpoints, oauthApis } from '../configs/Api'
import { UserContext } from '../layouts/Boby'


const Login = () => {
    const [username, setUsername] = useState([])
    const [password, setPassword] = useState([])
    const [user, dispatch] = useContext(UserContext)

    const login = async (event) => {
        event.preventDefault()

        try{
            // const info = await Api.post(endpoints['oauth2-info'])
            const res = await Api.post(endpoints['login'], {
                'client_id': 'j9HoxIMT8aCoWEk53fex2Wbev3506vv4bC34YvEF',
                'client_secret': 'Dn31cKYB2oNNgQgM6n8DzqO4fRu6S952IUSNxalVIpsX9BLMSPpOCz8J6kSDLMhZLy5yk4dgE5KzreXQDNVpQ7spiSvtEvYC6v4R5GkxykadumhcWgjBQ0NJYPnFpH08',
                'username': username,
                'password': password,
                'grant_type': 'password'
            })
            cookies.save('access_token', res.data.access_token)
            console.info(res.data.access_token)

            const user = await oauthApis().get(endpoints['current-user'])
            console.info(user.data)
            cookies.save('user', user.data)

            dispatch({
                'type': 'LOGIN',
                'payload': user.data
            })
        } 
        catch (error){
            console.error(error)
        }
        
    }
    if(user != null)
        return <Navigate to='/' />

  
    return (
        <>
            <Form className='form' onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value)} value={username} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} value={password} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </>
    )
}

export default Login