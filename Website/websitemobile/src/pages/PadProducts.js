import React, { useEffect, useState } from 'react'
import { Carousel, Row } from 'react-bootstrap'
import ProductList from '../components/ProductList'
import Api, { endpoints } from '../configs/Api'

const PadProducts = () => {
    const [products, setProducts] = useState([])
    const [banners, setBanners] = useState([])

    useEffect (() => {
        const loadProducts = async() => {
            const res = await Api.get(endpoints['ipadproducts'])
            setProducts(res.data)
        }
        loadProducts()
    },[])

    useEffect(() =>{
        const loadBanners = async() =>{
            const ress = await Api.get(endpoints['banners'])
            setBanners(ress.data)
        }
        loadBanners()
    },[])

    return (
        <>
            <Carousel className='carou' fade>
                {banners.map( b =>  
                    <Carousel.Item key={b.id}> 
                        <img className="d-block w-100" src={b.image} alt={b.name} /> 
                    </Carousel.Item>
                )}
            </Carousel>
            <Row>
                {products.map(a => {
                    return <ProductList key={a.id} id={a.id} name={a.name} image={a.image} isProduct={true} price={a.price} />
                })}
            </Row>
        </>
    )
}

export default PadProducts