import React, { useState, useEffect } from 'react';
import { Container, Col, Form, Row, Button,  Toast } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../reusable/footer';
import Header from '../reusable/header';
import { register, GetUser } from '../../service/apiproduct'; // Ensure fetchAccounts is defined

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState(true); // Use strings for gender
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('danger');
    const [account, setAccount] = useState([]);

    // Fetch accounts on component mount
    useEffect(() => {
        const getAccounts = async () => {
            try {
                const accounts = await GetUser();
                setAccount(accounts);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };
        getAccounts();
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (account.some((acc) => acc.email === email)) {
            alert("Email đã tồn tại. Vui lòng đăng ký lại.");
            return;
        }

        const newUser = {
            id: account[account.length - 1].id + 1,
            username,
            email,
            password,
            fullname,
            gender,
            dob,
            status: true,
            role: 1
        };
        fetch("http://localhost:9999/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        }).then((res) => {
            if (!res.ok) {
                throw new Error("Đăng ký không thành công.");
            }
            setAlertVariant('success');
            setAlertMessage('Đăng ký thành công!');
            setShowAlert(true);
            setTimeout(() => {
                
                navigate("/login");
            }, 3000)
        }).catch(error => {
            console.error("Lỗi khi đăng ký:", error);
            setAlertVariant('danger');
            setAlertMessage('Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại sau.');
            setShowAlert(true);
            setTimeout(()=>{setShowAlert(false)}, 2000)
        });

    };

    return (
        <Container fluid >
            <Row>
                <Header />
            </Row>
            <br />
            <Row style={{paddingTop: '120px'}}>
                <Col md={6}>
                    <h1>Register</h1>
                    {showAlert ? (
                        <Toast className="toast-right" show={showAlert} onClose={() => setShowAlert(false)}>
                            <Toast.Header>
                                <strong className="me-auto">Login</strong>
                            </Toast.Header>
                            <Toast.Body>{alertMessage}</Toast.Body>
                        </Toast>
                    ) : (<></>)}
                    <br />
                    <Form onSubmit={handleRegister}>
                        <Form.Group as={Row} className="mb-3" controlId="email">
                            <Form.Label column sm="2">Email</Form.Label>
                            <Col sm="10">
                                <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="username">
                            <Form.Label column sm="2">Username</Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="fullname">
                            <Form.Label column sm="2">Full Name</Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Full name" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="dob">
                            <Form.Label column sm="2">Date of Birth</Form.Label>
                            <Col sm="10">
                                <Form.Control type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="password">
                            <Form.Label column sm="2">Password</Form.Label>
                            <Col sm="10">
                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </Col>
                        </Form.Group>
                        <Form.Group className='d-flex'>
                            <Form.Label style={{ marginRight: 75 }}>Gender</Form.Label>
                            <Form.Check
                                type="radio"
                                label="Male"
                                name="gender"
                                id="male"
                                style={{ marginRight: '10px' }}
                                
                                checked={gender === true}
                                onChange={() => setGender(true)}
                            />
                            <Form.Check
                                type="radio"
                                label="Female"
                                name="gender"
                                id="female"
                               
                                checked={gender === false}
                                onChange={() => setGender(false)}
                            />
                        </Form.Group>
                        <br />
                        
                        <br />
                        <Button type="submit">Sign up</Button>
                    </Form>
                    <br />
                    <Link to={'/login'}>Already have an account?</Link>
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
            <Row>
                <Footer />
            </Row>
        </Container>
    );
};

export default Register;
