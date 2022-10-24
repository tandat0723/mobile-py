import React, { useEffect, useState } from 'react'
import { Badge, Col, Image, Row, Spinner, Tab, Tabs } from 'react-bootstrap'
import { useParams } from 'react-router'
import Api, { endpoints } from '../configs/Api'
import '../static/Home.css'
import parse from 'html-react-parser';



const ProductDetail = () => {
    const [productDetail, setProductDetail] = useState([])
    const { product } = useParams()
    const [key, setKey] = useState('home')
    const [comment, setComment] = useState([])

    

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
                let res = await Api.get(endpoints['comments'](product))
                setComment(res.data)
            }
            catch(err) {
                console.error(err)
            }
        }
        loadComment()
    },[product])

    
    if (productDetail === null)
        return <Spinner animation="border" />
    if(window.FB){
        window.FB.XFBML.parse()
    }

    return (
        <>
            <div className='detail'>
                <Row>
                    <Col md={5} xs={12}>
                        <Image src={productDetail.image} fluid />
                    </Col>
                    <Col md={7} xs={12}>
                        {productDetail.tags?.map(t => <Badge className='tags' key={t.id} bg="secondary">{t.name}</Badge>)}
                        <br/>
                        <h3 id={productDetail.id}>{productDetail.name}</h3>
                        <hr />
                        
                        <div class="fb-like"data-href="https://developers.facebook.com/docs/plugins/"data-width="600"data-layout="standard"data-action="like"data-size="small"data-share="true"></div>  
                        <br />
                        <br />
                        <div className='nav-link'>Chọn dung lượng: </div>
                        <br />
                        <div className='nav-link'>Màu: </div>
                    </Col>
                </Row>
                <div className='body_de'>
                    <div className='body_detail'>
                        <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} transition={true} 
                            className="mb-3" justify>
                            <Tab eventKey="home" title="Mô tả">
                                <div>
                                    {parse(`${productDetail.description}`)}
                                </div>
                            </Tab>    
                            <Tab className='' eventKey="tech" title="Thông số kĩ thuật">
                                <div>
                                    {parse(`${productDetail.content}`)}
                                </div>
                            </Tab> 
                            <Tab eventKey="detail" title="Chi tiết sản phẩm">
                                <div>
                                    {parse(`${productDetail.detail}`)}
                                </div>
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
                            {/* {comment?.map(c =>   
                                <>    
                                <div>{c.comment}</div>
                                <div>Lúc: {c.created_date}</div>
                                </>
                            )} */}
                        </Col>
                        <div className = "fb-comments" data-href = "https://developers.facebook.com/docs/plugins/comments#configurator" data-width = "1000" data-numposts = "5" ></div>  
                    </Row>  
                </div>
            </div>  
        </>
    )
}

export default ProductDetail