import React, { memo } from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../static/Components.css'

const ProductList = (props) => {
    let path=`/products/${props.id}/`

    return (
        <Col className='product' md={3} xs={12}>
            <Link to={path} style={{textDecoration:"none"}}>
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

export default memo(ProductList)