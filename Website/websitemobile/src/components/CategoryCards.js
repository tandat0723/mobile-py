import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CategoryCards = (props) => {
    return (
        <Col md={2} xs={12} style={{marginBottom:"25px", marginTop:"25px"}}>
            <Link to='#'>
                <Card style={{borderRadius:"15px", height:"230px", backgroundColor:"#323232"}}>
                    <div style={{width:"120px", overflow:"hidden", display:"block", margin:"34px auto 0px", 
                                position:"absolute", bottom:"65px", right:"38px"}}>
                        <Card.Img variant="top" style={{width:"100%", height:"auto" }} to='#' src={props.obj.image} />
                    </div>
                    <Card.Title style={{textAlign:"center", color:"#fff", fontSize:"15px", position:"absolute", 
                                        left:"0px", right:"0px", bottom:"20px"}}>
                        {props.obj.name}
                    </Card.Title>
                </Card>
            </Link>
        </Col>
    )
}

export default CategoryCards