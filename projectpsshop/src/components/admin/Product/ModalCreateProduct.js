import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import {
  GetCategory,
  PostProduct,
} from "../../../service/apiproduct";

const ModalCreateProduct = (props) => {
  const { show, setShow, fetchData } = props;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0); // Default to zero
  const [quantity, setQuantity] = useState(0); // Default to zero
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [catId, setCatId] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryData = await GetCategory();
      setCategories(categoryData);
    };
    fetchCategories();
  }, []);

  const handleClose = () => {
    setShow(false);
    setName("");
    setPrice(0);
    setQuantity(0);
    setImage("");
    setCatId(0);
    setPreviewImage("");
  };

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitCreateProduct = async (event) => {
    event.preventDefault();

    if (!name || isNaN(price) || isNaN(quantity) || catId === 0) {
      toast.error("Please fill out all fields correctly.");
      return;
    }

    const newProduct = {
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      catId,
      status: true,
    };

    try {
      const response = await PostProduct(newProduct);
      if (response) {
        toast.success("Product created successfully!");
        handleClose();
        fetchData(); // Refresh product list after adding
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Failed to add product");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Create Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmitCreateProduct} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              required
              min="0"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Category</label>
            <select
              className="form-control"
              value={catId}
              onChange={(event) => setCatId(parseInt(event.target.value))}
              required
            >
              <option value="">--Select--</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleUploadImage}
            />
            {previewImage && (
              <img src={previewImage} alt="Preview" width="100" />
            )}
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalCreateProduct;
