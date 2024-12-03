import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './reusable/header';
import Footer from './reusable/footer';
import { GetUserdt, UpdateUserdt, GetAllOrders } from '../service/apiproduct';
import { useParams } from 'react-router-dom';
import '../css/userprofile.css';

const Userprofile = () => {
    const [user, setUser] = useState({});
    const { id } = useParams();
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(9); // Number of orders per page (3 orders per row * 3 rows)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userdata = await GetUserdt(id);
                setUser(userdata);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchUserOrders = async () => {
            try {
                const allOrders = await GetAllOrders();
                const userOrders = allOrders.filter(order => order.user?.uid == parseInt(id)); 
                setOrders(userOrders);
            } catch (error) {
                console.error('Error fetching user orders:', error);
            }
        };

        fetchUserData();
        fetchUserOrders();
    }, [id]);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await UpdateUserdt(id, user);
            setMessage('Save successfully');
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        } catch (error) {
            setMessage('Save failed!');
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        }
    };

    return (
        <Container fluid>
            <Header />
            <br />
            <div className="profile-body container">
                <div className="main-body">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img
                                            src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                            alt="Admin"
                                            className="rounded-circle p-1 bg-primary"
                                            width="110"
                                        />
                                        <div className="mt-3">
                                            <h4>{user.fullname}</h4>
                                            <p className="text-secondary mb-1">{user.role ? 'Admin' : 'User'}</p>
                                            <p className="text-muted font-size-sm">{user.username}</p>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    {['fullname', 'email', 'phone', 'address'].map((field, index) => (
                                        <div className="row mb-3" key={index}>
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">{field.charAt(0).toUpperCase() + field.slice(1)}</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name={field}
                                                    value={user[field] || ''}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="row">
                                        <div className="col-sm-3"></div>
                                        <div className="col-sm-9 text-secondary">
                                            <input
                                                type="button"
                                                className="btn btn-primary px-4"
                                                value="Save Changes"
                                                onClick={handleSave}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="d-flex align-items-center mb-3">My Orders</h5>
                                            <div className="order-grid">
                                                {currentOrders.map(order => (
                                                    <div className="order-item" key={order.id}>
                                                        <p><strong>Order ID:</strong> {order.id}</p>
                                                        <p><strong>Order Date:</strong> {order.oDate}</p>
                                                        <p><strong>Status:</strong> {order.status}</p>
                                                        <p><strong>Total:</strong> {order.total.toLocaleString("vi-VN")} VNĐ</p>
                                                    </div>
                                                ))}
                                            </div>
                                            {/* Pagination Controls */}
                                            <div className="pagination">
                                                {totalPages > 1 && Array.from({ length: totalPages }, (_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handlePageChange(index + 1)}
                                                        className={currentPage === index + 1 ? 'active' : ''}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Row>
                <Footer />
            </Row>
        </Container>
    );
};

export default Userprofile;
