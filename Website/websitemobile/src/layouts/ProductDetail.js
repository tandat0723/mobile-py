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
import $ from 'jquery'; 


const ProductDetail = () => {
    const [productDetail, setProductDetail] = useState(null)
    const { product } = useParams()
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
    
    function popupSuccessShow() {
        $('.popup-success').fadeIn();
        $('.bgcover-success').fadeIn();
    }
    function popupSuccessHide() {
        $('.popup-success').fadeOut();
        $('.bgcover-success').fadeOut();
        $('.bg-coverrate').fadeOut();
    }

    function popupNotiShow() {
        $('.popup-errorForm').not('.popup-incomplete').fadeIn();
        $('.bgcover-errorForm').fadeIn();
    }
    function popupNotiHide() {
        $('.popup-errorForm').not('.popup-incomplete').fadeOut();
        $('.bgcover-errorForm').fadeOut();
    }

    return (
        <>
            <div className='detail'>
                <Row>
                    <Col md={5} xs={12}>
                        <Image src={productDetail.image} fluid />
                    </Col>
                    <Col md={7} xs={12}>
                        {productDetail.tags?.map(t => <i className='hash-tag' key={t.id}>{t.name}</i>)}
                        <br/><br/>

                        <h3 id={productDetail.id}>{productDetail.name}</h3>
                        <hr />

                        <div className='capacity'>
                            <span>Dung lượng: </span>
                            <ul className='active'>
                                {productDetail.memory?.map(m => <li key={m.id}>
                                    <a href='#'>{m.name}</a>
                                </li>)}
                            </ul>
                        </div>
                        <div className='text-info'>Màu: </div>
                        <strong className='price'>{productDetail.price}</strong>
                        <div>
                            <div className='text-info'> Đánh giá sản phẩm: </div>
                            <MDBBtn variant={likeStatus} onClick={like}>Like</MDBBtn>
                            <br></br>
                            {user !== null && <Rating initialRating={productDetail.rate} onClick={rate} />}
                        </div>
                    </Col>
                </Row>
                <div className="wrap_rating wrap_border">
                    <div className="bg-coverrate"></div>
                    <div className="rating-topzone rc-topzone">
                    <div className="rating-topzonecr-uncmt">
                        <h2 className="rating-topzonecr-title">Đánh giá sản phẩm này</h2>
                        <ul className="rating-topzonecr-star">
                            <li data-val="1" className="click-openpopup">
                                <i className="iconcmt-unstarlist"></i>
                                <p data-val="1">Rất tệ</p>
                            </li>
                            <li data-val="2" className="click-openpopup">
                                <i className="iconcmt-unstarlist"></i>
                                <p data-val="2">Tệ</p>
                            </li>
                            <li data-val="3" className="click-openpopup">
                                <i className="iconcmt-unstarlist"></i>
                                <p data-val="3">Tạm ổn</p>
                            </li>
                            <li data-val="4" className="click-openpopup">
                                <i className="iconcmt-unstarlist"></i>
                                <p data-val="4">Tốt</p>
                            </li>
                            <li data-val="5" className="click-openpopup">
                                <i className="iconcmt-unstarlist"></i>
                                <p data-val="5">Rất tốt</p>
                            </li>
                        </ul>
                    </div>

                    <div className="popup-rating-topzone" style={{display: "none"}}>
                        <div className="close-rate"></div>
                            <p className="txt">Đánh giá sản phẩm</p>
                            <div className="bproduct">
                                <div className="img">
                                    <Image src="https://cdn.tgdd.vn/Products/Images/42/289663/s16/iPhone-14-thumb-topzone (4)-650x650.png" alt="iPhone 14"/>
                                </div>
                                <h3>iPhone 14</h3>
                            </div>
                            <ul className="rating-topzonecr-star">
                                <li data-val="1">
                                    <i className="iconcmt-unstarlist active"></i>
                                    <p data-val="1">Rất tệ</p>
                                </li>
                                <li data-val="2">
                                    <i className="iconcmt-unstarlist active"></i>
                                    <p data-val="2">Tệ</p>
                                </li>
                                <li data-val="3">
                                    <i className="iconcmt-unstarlist active"></i>
                                    <p data-val="3">Tạm ổn</p>
                                </li>
                                <li data-val="4">
                                    <i className="iconcmt-unstarlist active"></i>
                                    <p data-val="4" className="active-slt">Tốt</p>
                                </li>
                                <li data-val="5">
                                    <i className="iconcmt-unstarlist"></i>
                                    <p data-val="5">Rất tốt</p>
                                </li>
                            </ul>
                            <form action="" className="form-rate">
                                <a className="send-rate disabled">Gửi đánh giá</a>

                                <p className="intro-txt">Để đánh giá được duyệt, vui lòng tham khảo <a href="#">Quy định duyệt đánh giá</a></p>
                            </form>
                        </div>
                        <div className="bgcover-errorForm"></div>

                        <div className="popup-errorForm">
                            <p className="content">Cảm nhận vể sản phẩm chưa được nhập, bạn sẵn lòng chia sẻ thêm chứ?</p>
                            <div className="btn-errorForm">
                                <span className="unsend-rate" onClick={popupNotiHide()}>Không, gửi đánh giá</span>
                                <span className="ctnsend-rate ctnsend-continue">Có, viết cảm nhận</span>
                            </div>
                        </div>

                        <div className="popup-errorForm popup-incomplete">
                            <p className="content">Chờ đã! Bạn chưa gửi đánh giá, bạn có muốn gửi đi không?</p>
                            <div className="btn-errorForm">
                                <span className="unsend-rate" onClick={popupNotiHide()}>Có</span>
                                <span className="ctnsend-rate">Không</span>
                            </div>
                        </div>

                        <div className="bgcover-success"></div>
                        <div className="popup-success">
                            <h3 className="txt">Gửi đánh giá thành công</h3>
                            <p className="content">Cảm ơn bạn đã đánh giá sản phẩm.<br/>Hệ thống sẽ kiểm duyệt và đăng đánh giá của bạn sau 1 - 2 ngày.</p>
                            <div className="close-popup-success" onClick={popupSuccessHide()}>Đóng</div>
                        </div>
                    </div>
                </div>

                <div className='body_de'>
                    <div className='body_detail'>
                        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
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

