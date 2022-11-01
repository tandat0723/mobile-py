import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate} from 'react-router-dom'
import Api, { endpoints } from '../configs/Api'
import '../static/Home.css'
import cookies from 'react-cookies'
import { UserContext } from './Boby'



const Header = () => {
    const [categories, setCategories] = useState([])
    const [q, setQ] = useState('')
    const nav = useNavigate()
    const [user, dispatch] = useContext(UserContext)


    useEffect(() => {
        const loadCategories = async() => {
            const res = await Api.get(endpoints['categories'])
            setCategories(res.data)
        }
        loadCategories()
    },[])


    const search = (event) => {
        event.preventDefault()
        nav(`/?kw=${q}`)
    } 

    const logout = (event) => {
        event.preventDefault()
        cookies.remove('access_token')
        cookies.remove('current_user')
        dispatch({'type': 'LOGOUT'})
        nav('/login')
    }

    let path = 
    <>
        <Link className='nav-link login' to='/login'>Đăng nhập</Link>
        <Link className='nav-link register' to='/register'>Đăng ký</Link>
    </>
    if (user !== null && user !== undefined)  
        path = 
        <>
            <Link className='nav-link login' to='/'>{user.username}</Link>
            <Link className='nav-link register' onClick={logout}>Đăng xuất</Link>
        </>
    

    return (
        <>
        <Container>
            <Navbar className='navv' bg="light" expand="lg">
                <Navbar.Brand href="/">Mobile Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-n av">
                    <Nav className="me-auto">
                        {categories.map(c => {
                            const path=`/categories/${c.id}/products/`
                            return <Link key={c.id} className='nav-link' to={path}>{c.name}</Link>
                        })}
                    </Nav>
                    <Form className='d-flex' onSubmit={search}>
                        <Form.Control
                            type="search"
                            placeholder="Tìm kiếm sản phẩm.."
                            className="me-2"
                            aria-label="Search"
                            value={q}
                            onChange={(event) => setQ(event.target.value)} />
                        <Button type='submit' variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
                <div className='patern'>
                    {path}
                </div>
            </Navbar>
        </Container>
        </>
    )
}

export default Header