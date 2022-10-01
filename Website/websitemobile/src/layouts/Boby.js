import React, { createContext, useReducer } from 'react'
import Header from './Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import PhoneProducts from '../pages/PhoneProducts'
import PadProducts from '../pages/PadProducts'
import MacProducts from '../pages/MacProducts'
import WatchProducts from '../pages/WatchProducts'
import SoundProducts from '../pages/SoundProducts'
import AccessoryProducts from '../pages/AccessoryProducts'
import Login from '../pages/Login'
import UserReducer from '../reducers/UserReducer'
import ProductDetail from './ProductDetail'

export const UserContext = createContext()

const Boby = () => {
    const [user, dispatch] = useReducer(UserReducer)


    return (
        <BrowserRouter>
            <UserContext.Provider value={[user, dispatch]}> 
                <Header />
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/categories/1/products/' element={<PhoneProducts />} />
                    <Route exact path='/categories/2/products/' element={<PadProducts />}/>
                    <Route exact path='/categories/3/products/' element={<MacProducts />}/>
                    <Route exact path='/categories/4/products/' element={<WatchProducts />}/>
                    <Route exact path='/categories/5/products/' element={<SoundProducts />}/>
                    <Route exact path='/categories/6/products/' element={<AccessoryProducts />}/>
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/products/:productId' element={<ProductDetail />} />
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

export default Boby