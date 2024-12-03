import React, { useEffect, useState } from "react";
import "../../../css/admin.css";
import { Button, Table, Pagination, Image, Col } from "react-bootstrap";
import {
  DeletePost,
  GetCategory,
  GetProduct,
} from "../../../service/apiproduct";
import ModalCreateProduct from "./ModalCreateProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";
import Nav from "../Nav";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [dataUpdate, setDataUpdate] = useState({});
  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [previewImage, setPreviewImage] = useState(null); // Thêm state cho previewImage
  const [image, setImage] = useState(null); // Thêm state cho image

  // Fetch product and category data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productData = await GetProduct();
      const categoryData = await GetCategory();
      setProducts(productData);
      setCategory(categoryData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Show and hide modals
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleClickBtnDelete = (product) => {
    setDataDelete(product);
    setShowModalDelete(true);
  };

  const handleClickBtnUpdate = (product) => {
    setDataUpdate(product);
    setShowModalUpdate(true);
  };

  const resetUpdateData = () => setDataUpdate({});

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]); // Ensure you have this state to store the file
    }
  };

  const renderProductImage = (product) => {
    if (product.images && product.images.length > 0) {
      return (
        <Image
          src={`/images/${product.images[0].name}`} // Đảm bảo đường dẫn ảnh chính xác
          width="100"
          thumbnail
          alt={product.name}
        />
      );
    } else if (previewImage) { // Hiển thị hình ảnh đã tải lên
      return (
        <Image
          src={previewImage}
          width="100"
          thumbnail
          alt="Preview"
        />
      );
    } else {
      return <span>Không có ảnh</span>;
    }
  };

  return (
    <div className="container my-4 content">
      <h2 className="text-center mb-4">Products List</h2>
      <div className="row mb-3">
        <div className="col">
          <Button variant="success" onClick={handleShowModal}>
            Create Product
          </Button>
        </div>
      </div>

      {/* Product Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>CatID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                {product.price ? product.price.toLocaleString("vi-VN") : "N/A"}
              </td>
              <td>{renderProductImage(product)}</td>
              <td>{product.quantity}</td>
              <td>
                {category.find((ca) => ca.id === product.catId)?.name || 'N/A'}
              </td>
              <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-1"
                  onClick={() => handleClickBtnUpdate(product)}
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleClickBtnDelete(product)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <Col className="d-flex justify-content-center">
        <Pagination>
          {Array.from(
            { length: Math.ceil(products.length / productsPerPage) },
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

      {/* Modals */}
      <ModalCreateProduct
        show={showModal}
        setShow={setShowModal}
        products={products}
        setProducts={setProducts}
        fetchData={fetchData}
        setPreviewImage={setPreviewImage} // Thêm setPreviewImage vào props
        setImage={setImage} // Thêm setImage vào props
      />
      <ModalDeleteProduct
        show={showModalDelete}
        setShow={setShowModalDelete}
        dataDelete={dataDelete}
        fetchData={fetchData}
      />
      <ModalUpdateProduct
        show={showModalUpdate}
        setShow={setShowModalUpdate}
        dataUpdate={dataUpdate}
        fetchData={fetchData}
        resetUpdateData={resetUpdateData}
      />
    </div>
  );
}

export default ProductList;
