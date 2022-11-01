import cookies from 'react-cookies'
import React, { useContext, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import Api, { endpoints } from '../configs/Api'
import '../static/Home.css'
import { UserContext } from '../layouts/Boby'


const Login = () => {
    const [username, setUsername] = useState([])
    const [password, setPassword] = useState([])
    const [user, dispatch] = useContext(UserContext)
    const [erMsg, setErMsg] = useState(null)

    const login = async (event) => {
        event.preventDefault()

        try{
            let info = await Api.get(endpoints['oauth2-info'])
            const res = await Api.post(endpoints['login'], {
                'client_id': info.data.client_id,
                'client_secret': info.data.client_secret,
                'username': username,
                'password': password,
                'grant_type': 'password'
            })

            if (res.status === 200) {
                cookies.save('access_token', res.data.access_token)

                const user = await Api.get(endpoints['current-user'], {
                    headers: {
                        'Authorization': `Bearer ${cookies.load('access_token')}`
                    }
                })

                cookies.save('current_user', user.data)
                dispatch({
                    'type': "LOGIN",
                    'payload': user.data
                })
            } 
        } catch (error){
            console.error(error)
            setErMsg('Tài khoản hoặc mật khẩu không đúng!!!')
        }
        
    }

    if (user != null)
        return <Navigate to="/" />
  
    return (
        <div className='border-register'>
            <h2 className='text-center text-success'>ĐĂNG NHẬP</h2>
            
            <Form className='form' onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control className='text-mb' type="text" placeholder="Nhập tên tài khoản..." onChange={(event) => setUsername(event.target.value)} value={username} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control className='text-mb' type="password" placeholder="Nhập mật khẩu..." onChange={(event) => setPassword(event.target.value)} value={password} />
                </Form.Group>
                <Button className='button-login' variant="primary" type="submit">
                    Đăng nhập
                </Button>
            </Form>
            {erMsg !== null && <Alert className='text-center'  key='danger' variant='danger' > {erMsg} </Alert>}
        </div>
    )
}

export default Login