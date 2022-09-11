import React from 'react'
import { Carousel } from 'react-bootstrap'

const BannerCarousel = (props) => {
    return (
        <Carousel.Item className='carsou'>
            <img className="d-block w-100" src={props.obj.image} alt={props.obj.name} />
        </Carousel.Item>
    )
}

export default BannerCarousel