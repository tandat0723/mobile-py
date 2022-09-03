import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Api, { endpoints } from '../configs/Api'

const Header = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const loadCategories = async() => {
            const res = await Api.get(endpoints['categories'])
            setCategories(res.data)
        }
        loadCategories()
    },[])

    return (
        <Navbar bg="light" expand="lg">
          <Container>
              <Navbar.Brand href="#home">Mobile Store</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Link className='nav-link' to='/'>Home</Link>
                  {categories.map(c => <Link className='nav-link' to='#'>{c.name}</Link>)}
                </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
    )
}

export default Header