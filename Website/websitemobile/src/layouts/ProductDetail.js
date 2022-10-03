import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Api, { endpoints } from '../configs/Api'
import '../static/Home.css'

const ProductDetail = () => {
    const [productDetail, setProductDetail] = useState([])
    const productId = useParams()

    useEffect (() => {
        const loadProductDetail = async() => {
            const res = await Api.get(endpoints['product-detail'](productId))
            setProductDetail(res.data)
            console.info(res.data)
        }
        loadProductDetail()
    },[productId])

    return (
        <>
            <div className='fa'>
                <div className='left'>
                    <Card>
                        <div>
                            <Card.Img variant="top"src={productDetail.image} />
                        </div>
                    </Card>
                </div>
                <div className='right'>
                    {/* { {productDetail.map(p => <div>{p.name}</div>)} } */}
                </div>
            </div>
        </>
    )
}

export default ProductDetail