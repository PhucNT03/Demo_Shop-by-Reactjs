import React, { useRef } from "react";
import Header from "./reusable/header";
import { Container, Row, Spinner } from "react-bootstrap";
import "../css/home.css";
import Carousel from "react-bootstrap/Carousel";
import Footer from "./reusable/footer";
import Product from "./product";
import "../css/header.css";
import { useCartFetch } from "../hooks/cart.hook";
import { addToCart } from "../utils/cart.ulti";
import { useLoading } from "../contexts/LoadingContext"; // Import the context

function Home() {
  const productRef = useRef(null);
  const { cart, setCart, cartCount, setCartCount } = useCartFetch();
  const { loading } = useLoading(); // Use the context

  const handleAddToCart = (product) => {
    addToCart(product, cart, setCart, cartCount, setCartCount);
  };

  return (
    <Container fluid>
      {loading && (
        <div className="loading-overlay">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      <Header productRef={productRef} cartCount={cartCount} />
      <Row style={{ paddingTop: "118px" }}>
        <div className="px-0">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/sale.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/ps4_1.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/ps5.png"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </Row>
      <br />
      <Row>
        <div ref={productRef}>
          <Product addToCart={handleAddToCart} />
        </div>
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container>
  );
}

export default Home;
