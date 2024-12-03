import React, { useState } from 'react';
import { Row, Container } from 'react-bootstrap';
import Footer from '../../components/reusable/footer';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/reusable/header';
import { submitOrder, GetProduct, updateProduct } from '../../service/apiproduct';
import { useCartFetch } from '../../hooks/cart.hook';
import { SectionCart } from './components/sectionCart';
import { FormCheckOut } from './components/formCheckOut';
import { Bounce,  toast } from "react-toastify";

function Cart() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        oDate: "",
        rDate: "",
        status: "",
        user: {
            uid: "",
            fname: "",
            lname: "",
            address: "",
            mobile: "",
            uemail: ""
        },
        product: [
            {
                pid: "",
                pname: "",
                price: "",
                quantity: "",
            }
        ]
    });

    const { cart, setCart, cartCount, setCartCount, userAccount } = useCartFetch();

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity === 0) {
            removeFromCart(itemId);
        } else {
            const updatedCart = cart.map(item => {
                if (item.id === itemId) {
                    item.quantity = newQuantity;
                }
                return item;
            });
            setCart(updatedCart);
        }
    };

    const removeFromCart = (itemId) => {
        const updatedCart = cart.filter(item => item.id !== itemId);
        setCart(updatedCart);
        setCartCount(prevCount => prevCount - 1);
    };

    const calculateTotal = () => {
        const totalPriceBeforeVAT = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        return totalPriceBeforeVAT;
    };

    const clearCart = () => {
        setCart([]);
        setCartCount(0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            toast.warn('Cannot submit empty cart', { position: toast.POSITION.TOP_CENTER });
            return;
        }
        const currentDate = new Date().toISOString().split('T')[0];
        const formattedDate = currentDate;

        const newOrder = {
            oDate: currentDate,
            rDate: formData.rDate || formattedDate,
            status: "processing",
            user: {
                uid: userAccount.id,
                fname: formData.user.fname,
                lname: formData.user.lname,
                address: formData.user.address,
                mobile: formData.user.mobile,
                uemail: userAccount.email
            },
            product: cart.map(item => ({
                pid: item.id,
                pname: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            total: calculateTotal()
        };

        try {
            const products = await GetProduct();
            const insufficientStockItems = cart.filter(cartItem => {
                const product = products.find(p => p.id === cartItem.id);
                return product && cartItem.quantity > product.quantity;
            });

            if (insufficientStockItems.length > 0) {
                const itemNames = insufficientStockItems.map(item => item.name).join(', ');
                toast.error(`The following items have insufficient stock: ${itemNames}`, { position: toast.POSITION.TOP_CENTER });
                return;
            }

            const response = await submitOrder(newOrder);
            if (response.status === 201) {
                toast.success('Order successfully placed!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
                await updateProductQuantities(cart);
                clearCart();
                handleClose();
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                throw new Error('Failed to place order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    const updateProductQuantities = async (cart) => {
        try {
            const products = await GetProduct();
            const updatePromises = cart.map(cartItem => {
                const product = products.find(p => p.id === cartItem.id);
                if (product) {
                    product.quantity -= cartItem.quantity;
                    if (product.quantity <= 0) {
                        product.status = false;
                    }
                    return updateProduct(product);
                } else {
                    return Promise.resolve();
                }
            });
            await Promise.all(updatePromises);
        } catch (error) {
            console.error('Error updating product quantities:', error);
        }
    };

    return (
        <Container fluid>
            <Header cartCount={cartCount} />
            <SectionCart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} calculateTotal={calculateTotal} handleShow={handleShow} />
            <FormCheckOut show={show} cart={cart} handleClose={handleClose} userAccount={userAccount} formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} calculateTotal={calculateTotal} />
            <section className="section-name bg padding-y">
                <div className="container">
                    <h6>Payment and refund policy</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </section>
            <Row><Footer /></Row>
        </Container>
    )
}

export default Cart;
