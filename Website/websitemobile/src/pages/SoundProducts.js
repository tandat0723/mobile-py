import React, { useEffect, useState } from 'react'
import { Carousel, Row } from 'react-bootstrap'
import ProductList from '../components/ProductList'
import Api, { endpoints } from '../configs/Api'

const SoundProducts = () => {
    const [products, setProducts] = useState([])
    const [banners, setBanners] = useState([])

    useEffect (() => {
        const loadProducts = async() => {
            const res = await Api.get(endpoints['soundproducts'])
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
                {products.map(p => {
                    return <ProductList id={p.id} isProduct={true} key={p.id} name={p.name} image={p.image} price={p.price} />
                })}
            </Row>
        </>
    )
}

export default SoundProducts