import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { DeletePost } from "../../../service/apiproduct";

const ModalDeleteProduct = (props) => {
  const { show, setShow, dataDelete, fetchData } = props;

  const handleClose = () => setShow(false);
  const handleSubmitDelete = async () => {
    try {
      await DeletePost(dataDelete.id);
      handleClose();
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
      // Handle error (e.g., show error message)
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this product ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancle
          </Button>
          <Button variant="primary" onClick={handleSubmitDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteProduct;
