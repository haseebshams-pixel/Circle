import React, { useState } from "react";
import { Modal, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import { setUser } from "../../../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { GoogleLogin } from "react-google-login";
import Email from "../../modal/email";

import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import { toastMessage } from "../../../components/common/toast";

function LoginModal({ openModal, HideModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSubmitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setOpen] = useState(false);
  const openModal2 = () => setOpen(true);
  const closeModal2 = () => setOpen(false);

  const responseGoogle = (response) => {
    console.log(response);
    const data = {
      email: response.profileObj.email,
      firstname: response.profileObj.givenName,
      lastname: response.profileObj.familyName,
      googleId: response.profileObj.googleId,
    };
    axios
      .post("users/googleauth", data)
      .then((res) => {
        if (res.statusText === "OK") {
          localStorage.setItem("token", res.data.token);
          console.log("data", res.data.user);
          let resp = {
            isLoggedIn: true,
            token: res.data.token,
            user: res.data.user,
          };
          dispatch(setUser(resp));
          history.push(`/Profile/${res.data.user.id}`);
          HideModal();
          toastMessage("User Logged In Successfully", "success");
        }
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        toastMessage("User not Found", "error");
      });
  };
  const handleSubmit = async () => {
    setSubmitting(true);
    const data = {
      email: email,
      password: password,
    };
    axios
      .post("users/signin", data)
      .then((res) => {
        if (res.statusText === "OK") {
          localStorage.setItem("token", res.data.token);
          console.log("data", res.data.user);
          let resp = {
            isLoggedIn: true,
            token: res.data.token,
            user: res.data.user,
          };
          setSubmitting(false);
          dispatch(setUser(resp));
          history.push(`/Profile/${res.data.user.id}`);
          HideModal();
          toastMessage("User Logged In Successfully", "success");
        }
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        toastMessage("User not Found", "error");
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
          <p className="login-heading pb-1">Welcome!</p>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-font-family">
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="text-font-family"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted text-font-family">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="text-font-family">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="text-font-family"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text
                className="text-muted text-font-family d-flex justify-content-end"
                role="button"
                onClick={() => {
                  HideModal();
                  openModal2();
                }}
              >
                <ins>forgot password?</ins>
              </Form.Text>
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
              <p className="mb-0">Lets Go</p>
            )}
          </button>
          <div className="mt-3" />
          <GoogleLogin
            clientId="25061590946-bang7h32caih37tkvj1cr6nu10oijk1b.apps.googleusercontent.com"
            buttonText="Continue with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </Modal>
      <Email openModal={isOpen} HideModal={closeModal2} />
    </>
  );
}

export default LoginModal;
