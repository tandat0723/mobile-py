import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import ProductList from '../components/ProductList'
import Api, { endpoints } from '../configs/Api'

const MacProducts = () => {
    const [products, setProducts] = useState([])

    useEffect (() => {
        const loadProducts = async() => {
            const res = await Api.get(endpoints['macproducts'])
            setProducts(res.data)
        }
        loadProducts()
    },[])

    return (
        <Row>
            {products.map(p => {
                return <ProductList name={p.name} image={p.image} price={p.price} />
            })}
        </Row>
    )
}

export default MacProducts