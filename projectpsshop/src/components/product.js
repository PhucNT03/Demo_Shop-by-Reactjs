import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Pagination,
  ListGroup,
  Form,
} from "react-bootstrap";
import { GetProduct, GetCategory } from "../service/apiproduct";
import { BiSolidCartAdd, BiSolidShow, BiSolidStarHalf } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "../css/newProduct.css";

const Product = ({ addToCart }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [searchKey, setSearchKey] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000000);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      const productData = await GetProduct();
      const categoryData = await GetCategory();
      setProducts(productData);
      setCategories(categoryData);
    };
    fetchData();
  }, []);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (name === "minPrice") {
      setMinPrice(parseInt(value));
    } else if (name === "maxPrice") {
      setMaxPrice(parseInt(value));
    }
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchKey(e.target.value);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((prod) => {
    const matchesCategory =
      selectedCategory === "All" || prod.catId == selectedCategory;
    const matchesStatus =
      selectedStatus === "All" ||
      (selectedStatus === "Instock" && prod.status) ||
      (selectedStatus === "Outstock" && !prod.status);
    const matchesPrice = prod.price >= minPrice && prod.price <= maxPrice;
    const matchesSearch = prod.name.toLowerCase().includes(searchKey.toLowerCase());
    return matchesCategory && matchesStatus && matchesPrice && matchesSearch;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDetail = (productId) => {
    navigate(`/products/${productId}`); // Navigate to the product detail page
  };

  return (
    <Container>
      <Row>
        <Col md={2}>
          <Row>
            <div className="px-2">
              <h3 style={{ fontFamily: "sans-serif" }}>Filter by</h3>
              <ListGroup style={{borderRadius:10}}>
                <ListGroup.Item
                  as="li"
                  active={selectedCategory === "All"}
                  onClick={() => handleCategoryChange("All")}
                >
                  All
                </ListGroup.Item>
                {categories.map((ca) => (
                  <ListGroup.Item
                    key={ca.id}
                    as="li"
                    value={ca.id}
                    active={selectedCategory === ca.id}
                    onClick={() => handleCategoryChange(ca.id)}
                  >
                    {ca.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Row>
          <br />
          <h3 style={{ fontFamily: "sans-serif" }}>Or</h3>
          <Row>
            <Form className="px-2">
              <Form.Control
                type="search"
                placeholder="Search here..."
                className="me-2"
                aria-label="Search"
                style={{ width: "95%" }}
                onChange={handleSearchChange}
              />
            </Form>
          </Row>
          <Row className="px-2">
            <Form.Label>Status: </Form.Label>
            <Form.Check
              type="radio"
              label="All"
              name="status"
              id="statusAll"
              checked={selectedStatus === "All"}
              onChange={() => handleStatusChange("All")}
            />
            <Form.Check
              type="radio"
              label="Instock"
              name="status"
              id="statusInstock"
              checked={selectedStatus === "Instock"}
              onChange={() => handleStatusChange("Instock")}
            />
            <Form.Check
              type="radio"
              label="Outstock"
              name="status"
              id="statusOutstock"
              checked={selectedStatus === "Outstock"}
              onChange={() => handleStatusChange("Outstock")}
            />
          </Row>
          <Row className="px-2">
            <Form.Label>Price Range:</Form.Label>
            <input
              type="range"
              name="maxPrice"
              min={0}
              max={100000000}
              step={100000}
              value={maxPrice}
              onChange={handlePriceChange}
            />
            <div className="d-flex justify-content-between mt-2">
              <span>{minPrice.toLocaleString("vi-VN")} VNĐ</span>
              <span>{maxPrice.toLocaleString("vi-VN")} VNĐ</span>
            </div>
          </Row>
        </Col>
        <Col md={10}>
          <Row>
            <section className="section-products">
              <div className="container">
                <div className="row">
                {currentProducts && currentProducts.map((pr) => (
  <div key={pr.id} className="col-md-6 col-lg-4 col-xl-3">
    <div id="product-1" className="single-product">
      <div className="part-1">
        {pr.images && pr.images.length > 0 ? (
          <img src={`/images/${pr.images[0].name}`} alt="Product" />
        ) : (
          <img src="/images/default-product.jpg" alt="Default Product" />
        )}
        <ul>
          <li>
            <Button onClick={() => addToCart(pr)}>
              <BiSolidCartAdd />
            </Button>
          </li>
          <li>
            <Button onClick={() => handleDetail(pr.id)}>
              <BiSolidShow />
            </Button>
          </li>
          <li>
            <Button>
              <BiSolidStarHalf />
            </Button>
          </li>
        </ul>
      </div>
      <div className="part-2">
        <h3 className="product-title">{pr.name}</h3>
        {pr.status ? (
          <h4 style={{ color: "green" }}>Instock</h4>
        ) : (
          <h4 style={{ color: "red" }}>Out of stock</h4>
        )}
        <br></br>
        <h4 className="product-price">
          {pr.price.toLocaleString("vi-VN")} VNĐ
        </h4>
      </div>
    </div>
  </div>
))}
                </div>
              </div>
            </section>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <Pagination>
                {Array.from(
                  { length: Math.ceil(filteredProducts.length / productsPerPage) },
                  (_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  )
                )}
              </Pagination>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
