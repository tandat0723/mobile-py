import React, { useEffect, useState } from 'react'
import { Button, Carousel, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate} from 'react-router-dom'
import Api, { endpoints } from '../configs/Api'
import '../static/Home.css'


const Header = () => {
    const [categories, setCategories] = useState([])
    const [banners, setBanners] = useState([])
    const [q, setQ] = useState('')
    const nav = useNavigate()

    useEffect(() => {
        const loadCategories = async() => {
            const res = await Api.get(endpoints['categories'])
            setCategories(res.data)
        }
        loadCategories()
    },[])

    useEffect(() =>{
        const loadBanners = async() =>{
            const ress = await Api.get(endpoints['banners'])
            setBanners(ress.data)
        }
        loadBanners()
    },[])

    const search = (event) => {
        event.preventDefault()
        nav(`/?kw=${q}`)
    } 

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Mobile Store</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {categories.map(c => {
                                const path=`/categories/${c.id}/products/`
                                return <Link className='nav-link' to={path}>{c.name}</Link>
                            })}
                        </Nav>
                        <Form className="d-flex" onSubmit={search}>
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
                </Container>
            </Navbar>
            <Carousel className='carou' fade>
                {banners.map( b =>  
                    <Carousel.Item> 
                        <img className="d-block w-100" src={b.image} alt={b.name} /> 
                    </Carousel.Item>
                )}
            </Carousel>
        </>
    )
}

export default Header