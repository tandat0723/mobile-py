import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import CategoryCards from '../components/CategoryCards'
import Api, { endpoints } from '../configs/Api'

const Home = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const loadCategories = async() => {
            const res = await Api.get(endpoints['categories'])
            setCategories(res.data)
        }
        loadCategories()
    },[])
    
    return (
        <>
            <Row>
                {categories.map(c => <CategoryCards obj={c} />)}
            </Row>
        </>
    )
}

export default Home