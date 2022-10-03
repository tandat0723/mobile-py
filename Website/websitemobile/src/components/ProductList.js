import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../static/Components.css'

const ProductList = (props) => {
    const nav = useNavigate()
    const goProduct = () => {
        if(props.isProduct === true)
            nav(`/products/${props.id}`)
        else
            nav(`/categories/${props.id}/products`)

    }

    return (
        <Col className='product' md={3} xs={12}>
            <Link to={goProduct} style={{textDecoration:"none"}}>
                <Card className='cards'>
                    <Card.Img className='img_items' variant="top" src={props.image}/>
                    <Card.Body className='title_items'>
                        <Card.Title className='item_names'>{props.name}</Card.Title>
                        <Card.Text className='item_prices'>{props.price}</Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    )
}

export default ProductList