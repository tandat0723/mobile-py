import React, { useEffect, useState } from 'react'
import { Carousel, Row } from 'react-bootstrap'
import { useLocation, } from 'react-router'
import ProductList from '../components/ProductList'
import Api, { endpoints } from '../configs/Api'
import { BsApple } from 'react-icons/bs'
import '../static/Home.css'
import { MDBSpinner } from 'mdb-react-ui-kit'


const Home = () => {
    const [products, setProducts] = useState([])
    const location = useLocation()
    const [banners, setBanners] = useState([])

    useEffect(() => {
        const loadProducts = async() => {
            try{
                const res = await Api.get(`${endpoints['products']}${location.search}`)
                setProducts(res.data.results)
            }
            catch(err) {
                console.error(err)
            }
        }
        loadProducts()
    },[location.search])

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
            {products.length === 0 &&   <div className='d-flex justify-content-center'>
                                            <MDBSpinner role='status'>
                                                <span className='visually-hidden'>Loading...</span> 
                                            </MDBSpinner>
                                        </div>}
            <div className='part'>
                <BsApple className='logo' />
                {/* <div className='title'>iPhone</div> */}
            </div>
            <Row className='list-product'>
                {products.map(p => {
                    return <ProductList key={p.id} id={p.id} name={p.name} image={p.image} price={p.price}/>
                })}
            </Row>
        </>
    )
}

export default Home