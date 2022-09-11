import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router'
import CategoryCards from '../components/CategoryCards'
import ProductList from '../components/ProductList'
import Api, { endpoints } from '../configs/Api'
import { BsApple } from 'react-icons/bs'

const Home = () => {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const location = useLocation()
    const [productphones, setProductPhones] = useState([])
    const { categoryId } = useParams()


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

    useEffect(() => {
        const loadProductPhones = async() => {
            try{
                const res = await Api.get(endpoints['product_phone'])
                setProductPhones(res.data.results)
            }
            catch(err) {
                console.error(err)
            }
        }
        loadProductPhones()
    },[])
    
    return (
        <>
            <Row>
                {categories.map(c => <CategoryCards obj={c} />)}
            </Row>
            <div className='part'>
                <BsApple className='logo' />
                {/* <div className='title'>iPhone</div> */}
            </div>
            <Row>
                {products.map(p => {
                    return <ProductList name={p.name} image={p.image} price={p.price} />
                })}
            </Row>
            {/* <Row>
                {productphones.map(d => {
                    return <ProductList name={d.name} image={d.image} price={d.price} />
                })}
            </Row> */}
        </>
    )
}

export default Home