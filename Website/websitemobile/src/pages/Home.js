import React, { useEffect, useState } from 'react'
import { Carousel, Row } from 'react-bootstrap'
import { useLocation, } from 'react-router'
import CategoryCards from '../components/CategoryCards'
import ProductList from '../components/ProductList'
import Api, { endpoints } from '../configs/Api'
import { BsApple } from 'react-icons/bs'

const Home = () => {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const location = useLocation()
    const [banners, setBanners] = useState([])
    // const [productphones, setProductPhones] = useState([])
    // const { categoryId } = useParams()


    useEffect(() => {
        const loadCategories = async() => {
            const res = await Api.get(endpoints['categories'])
            setCategories(res.data)
        }
        loadCategories()
    },[])

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
            <Row>
                {categories.map(c => <CategoryCards key={c.id} obj={c} />)}
            </Row>
            <div className='part'>
                <BsApple className='logo' />
                {/* <div className='title'>iPhone</div> */}
            </div>
            <Row>
                {products.map(p => {
                    return <ProductList key={p.id} name={p.name} image={p.image} price={p.price} />
                })}
            </Row>
        </>
    )
}

export default Home