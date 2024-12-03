import React, { useState, useEffect } from 'react';
import { Container, Col, Form, Row, Button, Alert, Spinner, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../reusable/footer';
import Header from '../reusable/header';
import { login } from '../../service/apiproduct';
import { useNavigate } from 'react-router-dom';
import '../../css/toast.css'; // Ensure custom CSS is imported

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('danger');

    const navigate = useNavigate();

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000); // Auto close after 3 seconds

            return () => clearTimeout(timer); // Cleanup the timer on component unmount
        }
    }, [showAlert]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate input data
        if (!email || !password) {
            setAlertVariant('danger');
            setAlertMessage('Please enter email and password.');
            setShowAlert(true);
            return;
        }

        try {
            const response = await login(email, password);
            console.log('Response from API:', response); // Check response from API

            if (response && response.length > 0) {
                localStorage.setItem('accounts', JSON.stringify(response[0]));
                setAlertVariant('success');
                setAlertMessage('Login successfully, redirecting...!');
                setShowAlert(true);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                throw new Error('Incorrect email or password.');
            }
        } catch (error) {
            console.error('Error:', error.message);
            setAlertVariant('danger');
            setAlertMessage(error.message);
            setShowAlert(true);
            setTimeout(()=>{setShowAlert(false)},2000)
        }
    };

    return (
        <Container fluid >
            <Row>
                <Header></Header>
            </Row>

            <br />
            <Row style={{paddingTop: '120px'}}>
                <Col md={6}>
                    {showAlert ? (
                        <Toast className="toast-right" show={showAlert} onClose={() => setShowAlert(false)}>
                            <Toast.Header>
                                <strong className="me-auto">Login</strong>
                            </Toast.Header>
                            <Toast.Body>{alertMessage}</Toast.Body>
                        </Toast>
                    ) : (<></>)}
                    <h1>Login</h1>
                    <br />
                    
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Email
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Password
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <br />
                       
                        <br />
                        <Button variant="primary" type="submit">Login</Button>
                    </Form>
                    <br />
                    <br />
                    <Link to={'/register'}>Don't have an account?</Link>
                </Col>

                <Col md={6} className="d-flex align-items-center justify-content-center">
                    <img
                        style={{ maxHeight: 400, maxWidth: 750, objectFit: 'contain' }}
                        src='/images/ps-test.jpg'
                        alt='PS Test'
                    />
                </Col>
            </Row>
            <br />
            <Row><Footer /></Row>
           
                
           
        </Container>
    );
};

export default Login;
