import React, { useEffect, useState } from 'react'
import { Col, Image, Row, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router'
import Api, { endpoints } from '../configs/Api'
import '../static/Home.css'

const ProductDetail = () => {
    const [productDetail, setProductDetail] = useState([])
    const product = useParams()

    

    useEffect (() => {
        let loadProductDetail = async() => {
            let res = await Api.get(endpoints['productdetail'](product))
            setProductDetail(res.data)
        }
        loadProductDetail()
    },[product])

    
    if (productDetail === null)
        return <Spinner animation="border" />

    return (
        <>
            <h1>Chi tiết sản phẩm</h1>
            <Row>
                <Col md={4} xs={12}>
                    <Image id={productDetail.id} src={productDetail.image} rounded fluid />
                </Col>
                <Col md={12} xs={12}>
                    {/* <p>
                        {productDetail.tags.map(t => <Badge bg="secondary">{t.name}</Badge>)}
                    </p> */}
                    <h3 id={productDetail.id}>{productDetail.name}</h3>
                    <h4 id={productDetail.id}>{productDetail.price}</h4>
                </Col>
            </Row>
            <div>
                {productDetail.description}
            </div>
        </>
    )
}

export default ProductDetail