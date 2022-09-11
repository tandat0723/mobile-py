import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../static/Components.css';

const CategoryCards = (props) => {
    return (
        <Col className='col' md={2} xs={12}>
            <Link to='#'>
                <Card className='card'>
                    <div className='item'>
                        <Card.Img className='img_item' variant="top" src={props.obj.image} />
                    </div>
                    <Card.Title className='title_item'>
                        {props.obj.name}
                    </Card.Title>
                </Card>
            </Link>
        </Col>
    )
}

export default CategoryCards