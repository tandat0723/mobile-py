import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import ProductList from '../components/ProductList'
import Api, { endpoints } from '../configs/Api'

const PadProducts = () => {
    const [products, setProducts] = useState([])

    useEffect (() => {
        const loadProducts = async() => {
            const res = await Api.get(endpoints['ipadproducts'])
            setProducts(res.data)
        }
        loadProducts()
    },[])

    return (
        <Row>
            {products.map(a => {
                return <ProductList name={a.name} image={a.image} price={a.price} />
            })}
        </Row>
    )
}

export default PadProducts