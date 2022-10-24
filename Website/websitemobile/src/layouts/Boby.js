import React from 'react'
import Header from './Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ProductDetail from './ProductDetail'
import Product from './Product'
import Footer from './Footer'
import Register from '../pages/Register'


const Boby = () => {

    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/categories/:category/products' element={<Product />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/products/:product' element={<ProductDetail />} />
                    <Route exact path='/register' element={<Register />}/>
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default Boby