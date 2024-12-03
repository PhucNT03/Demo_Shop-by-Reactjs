import React, { useState, useEffect } from 'react';
import { Container, Row, Form, Button, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../reusable/header';
import Footer from '../reusable/footer';

const Help = () => {
    const navigate = useNavigate();
    const authenticated = localStorage.getItem('accounts');
    const user = JSON.parse(authenticated) 

    const [prob, setProb] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('danger');

    useEffect(() => {
        if (!user) {
            navigate('/login'); 
        }
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newPro = {
            email: user.email,
            username: user.username,
            problem: prob,
            status: false
        };

        fetch("http://localhost:9999/problems", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPro),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("some error");
            }
            setAlertVariant('success');
            setAlertMessage('Send successfully!');
            setShowAlert(true);
        })
        .catch((error) => {
            setAlertVariant('danger');
            setAlertMessage('Send error, try again');
            setShowAlert(true);
        });

        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    };

    return (
        <Container fluid style={{paddingTop: '120px'}}>
            <Header />
            <br />
            {showAlert && (
                <Toast className="toast-right" show={showAlert} onClose={() => setShowAlert(false)}>
                    <Toast.Header>
                        <strong className="me-auto">Notification</strong>
                    </Toast.Header>
                    <Toast.Body>{alertMessage}</Toast.Body>
                </Toast>
            )}
            <div style={{ marginBottom: 38 }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control style={{ fontWeight: 'bold' }} type="email" value={user?.email} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Username</Form.Label>
                        <Form.Control style={{ fontWeight: 'bold' }} type="text" value={user?.username} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="problem">
                        <Form.Label>Your problem</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={prob}
                            onChange={(e) => setProb(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Send</Button>
                </Form>
            </div>
            <br />
            <Row><Footer /></Row>
        </Container>
    );
};

export default Help;
