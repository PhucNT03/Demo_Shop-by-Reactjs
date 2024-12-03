import React, { useState } from 'react';
import { Col, Nav, Navbar, Row } from 'react-bootstrap';
import '../../css/header.css'
import { BsAmazon, BsCartCheckFill, BsFillPersonFill } from "react-icons/bs";
import ProfileDropDown from '../reusable/logout.js';
import { Link, useNavigate } from 'react-router-dom';
function Header({ productRef, cartCount }) {


    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const focusProduct = () => {

        if (productRef && productRef.current) {

            productRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div className="position-fixed top-0 " style={{ zIndex: 1050, width: '100%', right: '0' }}>
            <Row>
                <div style={{ backgroundColor: 'black' }}>
                    <h3 style={{ fontFamily: 'time new roman', fontSize: 20, color: 'white', textAlign: 'center' }}>Sony</h3>
                </div>

                <Navbar expand="lg" className="header">
                    <Col className="d-flex" md={8}>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Navbar.Brand href="/">
                            <img className="logo-home" src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" />
                        </Navbar.Brand>

                        
                            <Nav className="me-auto">
                                <Nav.Link className='Nav-link' onClick={focusProduct}>Product</Nav.Link>
                                <Nav.Link className='Nav-link' onClick={() => navigate('/help')} >Help</Nav.Link>
                                <Nav.Link className='Nav-link' href="contact">Contact us</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Col>
                    <Col md={4}>
                        <div className='flex-item'>
                            <BsFillPersonFill className='hover-item' size={25} onClick={() => setShow(!show)} />
                            <Link to="/cart" >
                                <BsCartCheckFill className='hover-item' size={25} />
                            </Link>
                            <span className='badge badge-warning' id='lblCartCount'>{cartCount}</span>
                            <BsAmazon className='hover-item' size={25} as={Link} to="/cart" />

                        </div>
                    </Col>
                </Navbar>
            </Row>
            {show && <ProfileDropDown />}
        </div>
    );
};
export default Header;
