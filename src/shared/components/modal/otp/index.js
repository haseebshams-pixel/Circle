import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import Form from "react-bootstrap/Form";

import "react-toastify/dist/ReactToastify.css";
import { toastMessage } from "../../../components/common/toast";
import ResetPassword from "../resetPassword";

function OTP({ openModal, HideModal, email }) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [otp, setOTP] = useState("");
  const [isOpen, setOpen] = useState(false);
  const openModal2 = () => setOpen(true);
  const closeModal2 = () => setOpen(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    let data = {
      email: email,
      otp: otp,
    };
    axios
      .post(`users/verify-otp/`, data)
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
        toastMessage("Incorrect OTP", "error");
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
          <p className="login-heading pb-1">One Time Password</p>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Text className="text-muted text-font-family">
                Please check your email. We have sent you an OTP.
              </Form.Text>
              <Form.Control
                placeholder="Enter OTP"
                className="text-font-family"
                onChange={(e) => setOTP(e.target.value)}
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
      <ResetPassword openModal={isOpen} HideModal={closeModal2} email={email} />
    </>
  );
}

export default OTP;
