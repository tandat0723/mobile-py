import React, { useEffect, useState } from "react"
import { Carousel, Row } from "react-bootstrap"
import { useParams } from "react-router"
import ProductList from "../components/ProductList"
import Api, { endpoints } from "../configs/Api"

const Product = () => {
    const [productCategories, setProductCategories] = useState([])
    const [banners, setBanners] = useState([])
    const {category} = useParams()

    useEffect(() => {
        let loadProductCategories = async() => {
            try {
                let res = await Api.get(endpoints['productcategories'](category))
                setProductCategories(res.data)
            } 
            catch(err) {
                console.error(err)
            }
        }

        loadProductCategories()
    },[category])

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
                {productCategories.map(p => {
                    return <ProductList id={p.id} key={p.id} name={p.name} image={p.image} price={p.price} />
                })}
            </Row>
        </>
    )
}

export default Product