import React, { useContext, useEffect, useState } from 'react'
import { Badge, Button, Col, Form, Image, ListGroup, Row, Tab, Tabs } from 'react-bootstrap'
import { useParams } from 'react-router'
import Api, { endpoints } from '../configs/Api'
import '../static/Home.css'
import parse from 'html-react-parser'
import { UserContext } from './Boby'
import cookies from 'react-cookies'
import { MDBBtn, MDBSpinner } from 'mdb-react-ui-kit'
import Rating from 'react-rating'
import Moment from 'react-moment'



const ProductDetail = () => {
    const [productDetail, setProductDetail] = useState(null)
    const { product } = useParams()
    const [key, setKey] = useState('home')
    const [comment, setComment] = useState([])
    const [user] = useContext(UserContext)
    const [liked, setLiked] = useState(false)
    const [content, setContent] = useState()

    

    useEffect (() => {
        let loadProductDetail = async() => {
            try {
                let res =  await Api.get(endpoints['product-detail'](product))
                console.info(res.data)
                setProductDetail(res.data)
                setLiked(res.data.like)
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
                let res = await Api.get(endpoints['product-comments'](product),{
                    headers: {
                        'Authorization': `Bearer ${cookies.load('access_token')}`
                    }
                })
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

        let res = await Api.post(endpoints['comments'],{
            headers: {
                'Authorization': `Bearer ${cookies.load('access_token')}`
            }
        },{
            'comment': comment, 
            'product': product,
            'creator': 1
        })
        console.info(res.data)
        setComment([...comment, res.data])
    }


    const like = async() => {
        let res = await Api.post(endpoints['like-product'](product),{
            headers: {
                'Authorization': `Bearer ${cookies.load('access_token')}`
            }
        })
        console.info(res)
        if (res.status ===200)
            setProductDetail(res.data.like)
    }


    const rate = async(rate) => {
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

    let likeStatus = 'outline-primary'
    if (liked === true)
        likeStatus = 'primary'

    
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
                        <Image href={productDetail.image} fluid />
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
                            <div className='text-info'> Đánh giá sản phẩm: </div>
                            <MDBBtn variant={likeStatus} onClick={like}>Like</MDBBtn>
                            <br></br>
                            {user !== null && <Rating initialRating={productDetail.rate} onClick={rate} />}
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
                        <Col>
                            <div dangerouslySetInnerHTML={{__html: productDetail.comment}}></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form onSubmit={addComment}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" value={content} onChange={(event) => setContent(event.target.value)} placeholder="Thêm bình luận..." />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Thêm bình luận
                                </Button>
                            </Form>
                        </Col>
                        <Col>
                            {/* {user != null && <CommentForm product={product} comment={comment} setComment={setComment} />} */}
                            {/* <ListGroup>
                                {comment.map(c => <li key={c.id}>{c.comment} - <Moment fromNow>{c.created_date}</Moment></li>)
                                }
                            </ListGroup> */}
                        </Col>
                    </Row>  
                </div>
            </div>  
        </>
    )
}

export default ProductDetail

