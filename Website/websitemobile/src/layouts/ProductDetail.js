import React, { useContext, useEffect, useState } from 'react'
import { Badge, Button, Col, Form, Image, Row, Tab, Tabs } from 'react-bootstrap'
import { useParams } from 'react-router'
import Api, { endpoints } from '../configs/Api'
import '../static/Home.css'
import parse from 'html-react-parser'
import { UserContext } from './Boby'
import cookies from 'react-cookies'
import { MDBBtn, MDBSpinner } from 'mdb-react-ui-kit'
import Rating from 'react-rating'



const ProductDetail = () => {
    const [productDetail, setProductDetail] = useState(null)
    const { product } = useParams()
    const [key, setKey] = useState('home')
    const [comment, setComment] = useState([])
    const [user] = useContext(UserContext)

    

    useEffect (() => {
        let loadProductDetail = async() => {
            try {
                let res = await Api.get(endpoints['product-detail'](product))
                setProductDetail(res.data)
            } 
            catch(err) {
                console.error(err)
            }
        }

        loadProductDetail()
    },[product])

    useEffect(() => {
        let loadComment = async() => {
            try {
                let res = await Api.get(endpoints['product-comments'](product))
                setComment(res.data)
            }
            catch(err) {
                console.error(err)
            }
        }
        loadComment()
    },[product])

    const addComment = async (event) => {
        event.preventDefault()

        let res = await Api.post()
    }

    const like = async() => {
        let res = await Api.post(endpoints['like-product'](product),{
            headers: {
                'Authorization': `Bearer ${cookies.load('access_token')}`
            }
        })
        setProductDetail(res.data)
    }


    const rate = async() => {
        let res = await Api.post(endpoints['rate-product'](product),{
            headers: {
                'Authorization': `Bearer ${cookies.load('access_token')}`
            }
        },{
            'rate': rate
        })
        console.info(res.data)
        setProductDetail(res.data)
    }

    
    if (productDetail === null)
        return  <div className='d-flex justify-content-center'>
                    <MDBSpinner role='status'>
                        <span className='visually-hidden'>Loading...</span> 
                    </MDBSpinner>
                </div>

    return (
        <>
            <div className='detail'>
                <Row>
                    <Col md={5} xs={12}>
                        <Image src={productDetail.image} fluid />
                    </Col>
                    <Col md={7} xs={12}>
                        {productDetail.tags?.map(t => <Badge className='tags' key={t.id} bg="secondary">{t.name}</Badge>)}
                        <br/><br/>
                        <h3 id={productDetail.id}>{productDetail.name}</h3>
                        <hr />
                        <div className='text-info'>Chọn dung lượng: </div>
                        <br />
                        <div className='text-info'>Màu: </div>
                        <br/>
                        <div className='text-info'> Giá: {productDetail.price}</div>
                        <br/><br/>
                        <div>
                            {user != null && <MDBBtn variant={productDetail.like == true?'primary':'outline-primary'}></MDBBtn>}
                            <br></br>
                            {user != null && <Rating initialRating={productDetail.rating} onClick={rate} />}
                        </div>
                    </Col>
                </Row>
                <div className='body_de'>
                    <div className='body_detail'>
                        <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} transition={true} 
                            className="mb-3" justify>
                            <Tab eventKey="home" title="Mô tả">
                                {parse(`${productDetail.description}`)}
                            </Tab>    
                            <Tab className='' eventKey="tech" title="Thông số kĩ thuật">
                                {parse(`${productDetail.content}`)}
                            </Tab> 
                            <Tab eventKey="detail" title="Chi tiết sản phẩm">
                                {parse(`${productDetail.detail}`)}
                            </Tab> 
                        </Tabs>
                    </div>
                    <hr/>
                    <Row>
                        <Col md={2} xs={5}>
                            {comment.creator?.map(c =>  
                                <>
                                <Image src={c.avatar} fluid />
                                <div>{c.first_name} {c.last_name}</div>
                                </>
                            )}
                        </Col>

                        <Col md={10} xs={7}>
                            
                        </Col>
                    </Row>  
                </div>
            </div>  
        </>
    )
}

const CommentForm = ({product, comment, setComment}) => {
    const [content, setContent] = useState()
    const [user] = useContext(UserContext)


    const addComment = async (event) => {
        event.preventDefault()

        let res = await Api.post(endpoints['comments'],{
            headers: {
                'Authorization': `Bearer ${cookies.load('access_token')}`
            }
        },{
            'content': content, 
            'product': product,
            'creator': user.id
        })

        setComment([...comment, res.data])
    }

    return (
        <Form onSubmit={addComment}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" value={content} onChange={(event) => setContent(event.target.value)} placeholder="Thêm bình luận..." />
            </Form.Group>
        
            <Button variant="primary" type="submit">
                Thêm
            </Button>
        </Form>
    )
}


export default ProductDetail

