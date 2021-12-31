import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import { setUser } from "../../../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";

import OTP from "../../modal/otp";
import "react-toastify/dist/ReactToastify.css";
import { toastMessage } from "../../../components/common/toast";

function Email({ openModal, HideModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSubmitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [isOpen, setOpen] = useState(false);
  const openModal2 = () => setOpen(true);
  const closeModal2 = () => setOpen(false);

  const handleSubmit = async () => {
    setSubmitting(true);

    axios
      .post(`users/forgot-pass/${email}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setSubmitting(false);
          HideModal();
          openModal2();
          toastMessage(res.data, "success");
        }
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        HideModal();
        toastMessage("Email not Registered", "error");
      });
  };
  return (
    <>
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
          onClick={HideModal}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="login-modal-body">
          <p className="login-heading pb-1">Reset Password</p>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Text className="text-muted text-font-family">
                Please enter email.
              </Form.Text>
              <Form.Control
                type="email"
                placeholder="email"
                className="text-font-family"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
          <button
            className="connect-login-btn"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <Spinner animation="grow" size="sm" />
            ) : (
              <p className="mb-0">Next</p>
            )}
          </button>
        </div>
      </Modal>
      <OTP openModal={isOpen} HideModal={closeModal2} email={email} />
    </>
  );
}

export default Email;
