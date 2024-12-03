import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../css/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <Container fluid >
                <Row>
                    <Col md={8} className="footer-column">
                        <h5>Về Chúng tôi</h5>
                        <p>
                            CÔNG TY TNHH SONY ELECTRONICS VIỆT NAM<br />
                    
                        </p>
                        <p>
                            ĐỊA CHỈ: TẦNG 6 VÀ 7, TÒA NHÀ PRESIDENT PLACE, 93 NGUYỄN DU, PHƯỜNG BẾN NGHÉ.
                        </p>
                    </Col>
                    <Col md={4} className="footer-column">
                        <h5>Liên hệ</h5>
                        <p>EMAIL: storeSonyVietnam@gmail.com</p>
                        <p>ĐIỆN THOẠI: 084 38222227</p>
                        
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <p>&copy; 2024 Sony. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
