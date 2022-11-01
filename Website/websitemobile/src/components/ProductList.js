import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBRipple } from 'mdb-react-ui-kit'
import React, { memo } from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../static/Components.css'

const ProductList = (props) => {
    let path=`/products/${props.id}/`

    return (
        <Col className='product' md={3} xs={12}>
            <Link to={path} style={{textDecoration:"none"}}>
                <MDBCard className='cards'>
                    <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                        <MDBCardImage className='img_items' position='top' src={props.image}/>
                        <a>
                            <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                        </a>
                    
                        <MDBCardBody className='title_items'>
                            <MDBCardTitle className='item_names'>{props.name}</MDBCardTitle>
                            <MDBCardText className='item_prices'>{props.price}</MDBCardText>
                        </MDBCardBody>
                    </MDBRipple>
                </MDBCard>
                
            </Link>
        </Col>
    )
}

export default memo(ProductList)