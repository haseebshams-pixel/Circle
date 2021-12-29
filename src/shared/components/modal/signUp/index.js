import React, { useState, useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/reducers/userSlice";
import DatePicker from "react-datepicker";
import "./style.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toastMessage } from "../../../components/common/toast";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

function SignupModal({ openModal, HideModal, address }) {
  const history = useHistory();
  const [isSubmitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
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
          <div className="signup-dual-input-container">
            <div className="rowdirection">
              <p className="input-text">Firstname</p>
              <input
                type="text"
                placeholder="Firstname*"
                className="input-holder"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
            <div className="empty" />
            <div className="rowdirection">
              <p className="input-text">Lastname</p>
              <input
                type="text"
                placeholder="Lastname*"
                className="input-holder"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="signup-dual-input-container">
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
            <div className="empty" />
            <div className="rowdirection">
              <p className="input-text">Password</p>
              <input
                type="text"
                placeholder="password*"
                className="input-holder"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="rowdirection">
            <p className="input-value">DOB</p>
            <DatePicker
              selected={dob}
              onChange={(date) => setDOB(date.toDateString())}
              className="input-holder"
            />
          </div>
          <button type="submit" className="signup-button mt-3">
            {isSubmitting ? (
              <Spinner animation="grow" size="sm" />
            ) : (
              <p className="mb-0" onClick={handleSubmit}>
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
