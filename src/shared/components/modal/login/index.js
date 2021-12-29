import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import { setUser } from "../../../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import { toastMessage } from "../../../components/common/toast";

function LoginModal({ openModal, HideModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSubmitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          let resp = {
            isLoggedIn: true,
            token: res.data.token,
          };
          setSubmitting(false);
          dispatch(setUser(resp));
          history.push("/");
          HideModal();
          toastMessage("User Logged In Successfully", "success");
        }
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        toastMessage("Incorrect User Credentials", "error");
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
        <p className="login-heading">Welcome!</p>
        <div className="login-container">
          <div className="rowdirection">
            <p className="input-text">Email</p>
            <input
              type="email"
              placeholder="email*"
              className="input-holder"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="rowdirection">
            <p className="input-text">Password</p>
            <input
              type="password"
              placeholder="password*"
              className="input-holder"
              password={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

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
      </div>
    </Modal>
  );
}

export default LoginModal;
