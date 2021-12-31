import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import { setUser } from "../../../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";

import "react-toastify/dist/ReactToastify.css";
import { toastMessage } from "../../../components/common/toast";

function ResetPassword({ openModal, HideModal, email }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSubmitting, setSubmitting] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    setSubmitting(true);
    let data = {
      email: email,
      password: password,
    };
    axios
      .put(`users/set-pass/`, data)
      .then((res) => {
        if (res.statusText === "OK") {
          setSubmitting(false);
          HideModal();
          toastMessage(res.data, "success");
        }
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        HideModal();
        toastMessage("Incorrect Data", "error");
      });
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
        onClick={HideModal}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <div className="login-modal-body">
        <p className="login-heading pb-1">Reset Password</p>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Text className="text-muted text-font-family">
              Please enter new Password.
            </Form.Text>
            <Form.Control
              type="password"
              placeholder="Enter New Password"
              className="text-font-family"
              onChange={(e) => setPassword(e.target.value)}
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
            <p className="mb-0">Reset</p>
          )}
        </button>
      </div>
    </Modal>
  );
}

export default ResetPassword;
