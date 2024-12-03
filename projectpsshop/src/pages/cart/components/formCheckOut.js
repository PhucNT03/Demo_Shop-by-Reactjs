import React from 'react'
import { Button, Modal, Row, Col, Form } from 'react-bootstrap';
export const FormCheckOut = ({ show, handleClose, userAccount, formData, setFormData, handleSubmit, cart, calculateTotal }) => {
    return (
        <Modal show={show} onHide={handleClose} animation={true} size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row style={{ gap: '50px 50px' }}>
                        <Col xs={12} md={6} style={{ borderRadius: '5px', border: '1px solid white', margin: '0 10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                            <Form.Group className="mb-3" controlId="formGridAddress1" style={{ display: 'none' }}>
                                <Form.Label>Id</Form.Label>
                                <Form.Control type="text" value={userAccount ? userAccount.id : formData.user.uid} disabled />
                            </Form.Group>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type='email'
                                        value={userAccount ? userAccount.email : formData.user.uemail}
                                        onChange={(e) => setFormData({ ...formData, user: { ...formData.user, uemail: e.target.value } })}
                                        required
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        value={formData.user.fname}
                                        onChange={(e) => setFormData({ ...formData, user: { ...formData.user, fname: e.target.value } })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        value={formData.user.lname}
                                        onChange={(e) => setFormData({ ...formData, user: { ...formData.user, lname: e.target.value } })}
                                        required
                                    />
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3" controlId="formGridAddress2">
                                <Form.Label>Required Date</Form.Label>
                                <Form.Control
                                    placeholder="Required Date"
                                    type='date'
                                    value={formData.rDate}
                                    onChange={(e) => setFormData({ ...formData, rDate: e.target.value })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    placeholder="Address"
                                    type='text'
                                    value={formData.user.address}
                                    onChange={(e) => setFormData({ ...formData, user: { ...formData.user, address: e.target.value } })}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridAddress2">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control
                                    placeholder="Mobile"
                                    type="tel"
                                    pattern='[0-9]{10}'
                                    value={formData.user.mobile}
                                    onChange={(e) => setFormData({ ...formData, user: { ...formData.user, mobile: e.target.value } })}
                                    required
                                />
                                <Form.Text className="text-muted">Please enter a 10-digit mobile number.</Form.Text>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={5} style={{ borderRadius: '5px', border: '1px solid white', margin: '0 10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                            <dl className="d-flex justify-content-between">
                                <dt>Product</dt>
                                <dd>Money</dd>
                            </dl>
                            {cart.map((item) => (
                                <dl key={item.id} className="d-flex justify-content-between">
                                    <dd>{item.name} x <p style={{ fontWeight: 'bold', display: 'inline' }}>{item.quantity}</p></dd>
                                    <dd className="">{(item.price * item.quantity).toLocaleString('vi-VN')} VNĐ</dd>
                                </dl>
                            ))}
                            <hr />
                            <dl className="d-flex justify-content-between">
                                <dt>Total price:</dt>
                                <dd className="">{calculateTotal().toLocaleString('vi-VN')} VNĐ</dd>
                            </dl>
                            <dl className="d-flex justify-content-between">
                                <dt>Total:</dt>
                                <dd className="text-right h5"><strong>{calculateTotal().toLocaleString('vi-VN')} VNĐ</strong></dd>
                            </dl>
                            <hr />

                            <Button variant="primary" type='submit'>
                                Make payment
                            </Button>
                        </Col>
                    </Row>
                </Form >
            </Modal.Body>
        </Modal>
    )
}
