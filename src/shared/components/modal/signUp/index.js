import React, { useState } from "react";
import { Modal, Spinner, Row, Col } from "react-bootstrap";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { toastMessage } from "../../../components/common/toast";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

function SignupModal({ openModal, HideModal }) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dob, setDOB] = useState(new Date());

  const handleSubmit = async () => {
    setSubmitting(true);
    const data = {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      dob: dob,
    };
    axios
      .post("users/signup", data)
      .then((res) => {
        if (res.statusText === "OK") {
          setSubmitting(false);
          HideModal();
          toastMessage("User Registered Successfully", "success");
        }
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        toastMessage("Incorrect Data", "error");
      });
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
          <p className="signup-heading">Create your Account</p>
          <Form>
            <Row>
              <Col>
                <Form.Control
                  placeholder="First name"
                  onChange={(e) => setFirstname(e.target.value)}
                  className="text-font-family"
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Last name"
                  onChange={(e) => setLastname(e.target.value)}
                  className="text-font-family"
                />
              </Col>
            </Row>
            <Row className="pt-3">
              <Col>
                <Form.Control
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-font-family"
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-font-family"
                />
              </Col>
            </Row>
            <Row className="pt-3">
              <Col className="dobStyle">
                <Form.Control
                  placeholder="DOB"
                  type="date"
                  onChange={(e) => setDOB(e.target.value)}
                  className="text-font-family"
                />
              </Col>
            </Row>
          </Form>
          <button type="submit" className="signup-button mt-3">
            {isSubmitting ? (
              <Spinner animation="grow" size="sm" />
            ) : (
              <p className="m-0 pt-1 text-font-family" onClick={handleSubmit}>
                Sign up
              </p>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default SignupModal;
