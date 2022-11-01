import React, { createContext, useReducer } from 'react'
import Header from './Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ProductDetail from './ProductDetail'
import Product from './Product'
import Footer from './Footer'
import Register from '../pages/Register'
import UserReducer from '../reducers/UserReducer'
import cookies from 'react-cookies'


export const UserContext = createContext()
const Boby = () => {
    const [user, dispatch] = useReducer(UserReducer, cookies.load('current_user'))

    return (
        <BrowserRouter>
            <UserContext.Provider value={[user, dispatch]}>
                <Header />
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/categories/:category/products' element={<Product />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/products/:product' element={<ProductDetail />} />
                    <Route exact path='/register' element={<Register />}/>
                </Routes>
                <Footer />
            </UserContext.Provider>
        </BrowserRouter>
    )
}

export default Boby