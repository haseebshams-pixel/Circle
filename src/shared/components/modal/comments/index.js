import React, { useState, useEffect } from "react";
import { Modal, Spinner, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toastMessage } from "../../../components/common/toast";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

function CommentModal({ openModal, HideModal, user }) {
  const [isSubmitting, setSubmitting] = useState(false);
  console.log(user);

  const handleSubmit = async () => {
    setSubmitting(true);

    setSubmitting(false);
    HideModal();
    toastMessage("Profile Updated Successfully", "success");
    // axios
    //   .post("users/signup", data)
    //   .then((res) => {
    //     if (res.statusText === "OK") {
    //       setSubmitting(false);
    //       HideModal();
    //       toastMessage("User Registered Successfully", "success");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setSubmitting(false);
    //     toastMessage("Incorrect Data", "error");
    //   });
  };
  const CloseModal = () => {
    HideModal();
  };
  return (
    <Modal
      size="lg"
      backdrop="static"
      show={openModal}
      onHide={HideModal}
      centered
    >
      <button
        type="button"
        className="close custom-modal-close"
        onClick={CloseModal}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <div className="modal-body modal-body-flex">
        <div className="signup-login-form">
          <p className="signup-heading">Comments</p>
          <Form>
            <Row>
              <Col>
                <Form.Control
                  placeholder="write a comment"
                  className="text-font-family"
                />
              </Col>
              <button type="submit" className="signup-button mt-3">
                {isSubmitting ? (
                  <Spinner animation="grow" size="sm" />
                ) : (
                  <p
                    className="m-0 pt-1 text-font-family"
                    onClick={handleSubmit}
                  >
                    Update
                  </p>
                )}
              </button>
            </Row>
          </Form>
        </div>
      </div>
    </Modal>
  );
}

export default CommentModal;
