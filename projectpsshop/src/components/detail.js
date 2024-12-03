import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { GetProductdt } from '../service/apiproduct';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../css/detail.css'; 
import { Container, Row, Button  } from 'react-bootstrap';
import Header from './reusable/header';
import Footer from './reusable/footer';
import { useCartFetch } from '../hooks/cart.hook';
import { addToCart } from '../utils/cart.ulti';

const Detail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { cart, setCart, cartCount, setCartCount} = useCartFetch();
    const handleAddToCart = (product) => {
        addToCart(product, cart, setCart, cartCount, setCartCount);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await GetProductdt(id); 
            setProduct(productData);
        };
        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    // Kiểm tra trước khi gọi split
    const specifications = product.description && typeof product.description === 'string'
        ? product.description.split(' - ') 
        : []; // Gán mảng rỗng nếu product.description không hợp lệ

    return (
        <Container fluid style={{paddingTop: '120px'}}>
            <Header cartCount={cartCount}/>
            <div className="detail-container">
                <h1 className="detail-title">{product.name}</h1>
                <div className="detail-carousel">
                    <Carousel showArrows={true} showThumbs={true}>
                        {product.images.map((image) => (
                            <div key={image.id}>
                                <img className="detail-image" src={`/images/${image.name}`} alt={product.name} />
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div className="detail-info">
                    <p className="detail-status">
                        Status: {product.status ? <span className="instock">In stock</span> : <span className="outstock">Out of stock</span>}
                    </p>
                    <p className="detail-price">Price: {product.price.toLocaleString('vi-VN')} VNĐ (Not VAT)</p>
                    <div className="detail-specifications">
                        {specifications.length > 0 && specifications.map((spec, index) => (
                            <p style={{fontFamily:'sans-serif', fontSize:15}} key={index}>{spec}</p>
                        ))}
                    </div>
                    <Button style={{marginTop:180}} onClick={() => handleAddToCart(product)}>Add to cart</Button>
                </div>
            </div>
            <Row>
                <Footer />
            </Row>
        </Container>
    );
};

export default Detail;
