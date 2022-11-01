import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import '../static/Home.css'
import { Link } from 'react-router-dom';

  
const Footer = () => {
  

    return (
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
            <section className=''>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                        <h6 className='text-uppercase fw-bold mb-4'>
                            <MDBIcon fab icon="apple"className="me-3" /> MOBILE STORE
                        </h6>
                        <p className='footer-content'>
                            Năm 2020, Mobile Store trở thành đại lý ủy quyền của Apple. Chúng tôi phát triển chuỗi cửa hàng tiêu chuẩn và Apple Mono Store nhằm mang đến trải nghiệm tốt nhất về sản phẩm và dịch vụ của Apple cho người dùng Việt Nam.
                        </p>
                        </MDBCol>

                        <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                        <h6 className='text-uppercase fw-bold mb-4'>Sản phẩm</h6>
                        <p>
                            <a href='#!' className='text-reset'>iPhone</a>
                        </p>
                        <p>
                            <a href='#!' className='text-reset'>iPad</a>
                        </p>
                        <p>
                            <a href='#!' className='text-reset'>Macbook</a>
                        </p>
                        <p>
                            <a href='#!' className='text-reset'>Apple Watch</a>
                        </p>
                        <p>
                            <a href='#!' className='text-reset'>Phụ kiện</a>
                        </p>
                        </MDBCol>

                        <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                        <h6 className='text-uppercase fw-bold mb-4'>Giới thiệu</h6>
                        <p>
                            <a href='#!' className='text-reset'>
                            Chính sách bảo hành
                            </a>
                        </p>
                        <p>
                            <a href='#!' className='text-reset'>
                            Ưa đãi
                            </a>
                        </p>
                        <p>
                            <a href='#!' className='text-reset'>
                            Về chúng tôi
                            </a>
                        </p>
                        <p>
                            <a href='#!' className='text-reset'>
                            Hỗ trợ
                            </a>
                        </p>
                        </MDBCol>

                        <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                        <h6 className='text-uppercase fw-bold mb-4'>Thông tin</h6>
                        <p className='contact'> Hồ Chí Minh</p>
                        <p className='contact'>mobile.store@gmail.com</p>
                        <p className='contact'> 099343434</p>
                        <p className='contact'> 099223344 </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4'>
                Cảm ơn đã tin dùng &nbsp;
                <Link className='text-reset fw-bold' to={'/'}>
                    MOBILE STORE
                </Link>
            </div>
        </MDBFooter>
    )
}
export default Footer