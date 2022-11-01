import { React, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import Api, { endpoints } from '../configs/Api'
import '../static/Home.css'

const Register = () => {
    const [username, setUsername] = useState([])
    const [password, setPassword] = useState([])
    const [confirmPassword, setConfirmPassword] = useState([])
    const [firstName, setFirstName] = useState([])
    const [lastName, setLastName] = useState([])
    const [email, setEmail] = useState([])
    const avatar = useRef()
    const nav = useNavigate()

    const register = async(event) => {
        event.preventDefault()

        const registerUser = async() => {
            const formData = new FormData()
            formData.append('first_name', firstName)
            formData.append('last_name', lastName)
            formData.append('username', username)
            formData.append('password', password)
            formData.append('email', email)
            formData.append('avatar', avatar.current.files[0])

            try {
                let res = await Api.post(endpoints['register'], formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }})
                if(res.status === 201)
                    nav('/login')
                    
            } catch(err){
                console.error(err)
            }
            
        }

        if(password !== null && password === confirmPassword){
            registerUser()
        }
    }

    return(
        <div className='border-register'>
            <h2 className='text-center text-success'>ĐĂNG KÝ TÀI KHOẢN</h2>
            <Form className='form' onSubmit={register}>
                <RegisterForm id='firstName' type='text' placeholder='Nhập tên trước...' value={firstName} change={(event) => setFirstName(event.target.value)} />
                <RegisterForm id='lastName' type='text' placeholder='Nhập tên sau...' value={lastName} change={(event) => setLastName(event.target.value)} />
                <RegisterForm id='username' type='text' placeholder='Nhập tài khoản...' value={username} change={(event) => setUsername(event.target.value)} />
                <RegisterForm id='password' type='password' placeholder='Nhập mật khẩu...' value={password} change={(event) => setPassword(event.target.value)} />
                <RegisterForm id='confirmPassword' type='password' placeholder='Nhập lại mật khẩu...' value={confirmPassword} change={(event) => setConfirmPassword(event.target.value)} />
                <RegisterForm id='email' type='email' placeholder='Nhập tài khoản email...' value={email} change={(event) => setEmail(event.target.value)} />
                <Form.Group className="mb-3 " controlId="avatar">
                    <Form.Control className='text-mb upload' type="file" ref={avatar} />
                </Form.Group>
                <Button className='button-login' variant="primary" type="submit">
                    Đăng ký
                </Button>
            </Form>
        </div>
    )
}

export default Register

function RegisterForm(props) {
    return (
        <Form.Group className="mb-3" controlId={props.id}>
            <Form.Control className='text-mb' type={props.type} placeholder={props.placeholder} onChange={props.change} value={props.value} />
        </Form.Group>
    )
}