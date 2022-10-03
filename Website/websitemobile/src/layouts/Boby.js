import React, { createContext, useReducer } from 'react'
import Header from './Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import UserReducer from '../reducers/UserReducer'
import ProductDetail from './ProductDetail'
import Product from './Product'

export const UserContext = createContext()

const Boby = () => {
    const [user, dispatch] = useReducer(UserReducer)


    return (
        <BrowserRouter>
            <UserContext.Provider value={[user, dispatch]}> 
                <Header />
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/categories/:category/products/' element={<Product />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/products/:productId' element={<ProductDetail />} />
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

export default Boby