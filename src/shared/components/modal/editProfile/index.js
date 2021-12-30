import React, { useState, useEffect } from "react";
import { Modal, Spinner, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { setUser } from "../../../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { toastMessage } from "../../../components/common/toast";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

function EditProfileModal({ openModal, HideModal, user }) {
  const [isSubmitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const [email, setEmail] = useState(user.user.email);
  const [bio, setBio] = useState(user.user.bio);
  const [firstname, setFirstname] = useState(user.user.firstname);
  const [lastname, setLastname] = useState(user.user.lastname);
  const [dob, setDOB] = useState("2019-09-12");
  const [image, setImage] = useState(null);

  const formatDate = () => {
    let unformatedDate = user.user.dob;
    let day = "";
    let month = "";
    let year = "";
    for (let i = 0; i < 4; i++) {
      year = year + unformatedDate[i];
    }
    for (let i = 5; i < 7; i++) {
      month = month + unformatedDate[i];
    }
    for (let i = 8; i < 10; i++) {
      day = day + unformatedDate[i];
    }
    let formatedDate = year + "-" + month + "-" + day;
    setDOB(formatedDate);
  };

  useEffect(() => {
    formatDate();
  }, []);

  const handleSubmit = async () => {
    setSubmitting(true);
    let formData = new FormData();
    if (image != null) {
      formData.append("avatar", image);
    }
    formData.append("email", email);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("dob", dob);
    formData.append("bio", bio);

    axios
      .put("users/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          setSubmitting(false);
          console.log(res.data);
          let obj = {
            ...user,
            user: res.data,
          };
          dispatch(setUser(obj));
          HideModal();
          toastMessage("User Updated Successfully", "success");
        }
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        toastMessage("Error Updating", "error");
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
          <p className="signup-heading">Edit Profile</p>
          <Form>
            <Row>
              <Col>
                <Form.Control
                  placeholder="First name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="text-font-family"
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Last name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="text-font-family"
                />
              </Col>
            </Row>
            <Row className="pt-3">
              <Col>
                <Form.Control
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-font-family"
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="DOB"
                  type="date"
                  value={dob}
                  onChange={(e) => setDOB(e.target.value)}
                  className="text-font-family"
                />
              </Col>
            </Row>
            <Row className="pt-3">
              <Col>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="bio"
                  className="text-font-family"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="pt-3">
              <Col>
                <input
                  role="button"
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
              </Col>
              <Col></Col>
            </Row>
          </Form>
          <button type="submit" className="signup-button mt-3">
            {isSubmitting ? (
              <Spinner animation="grow" size="sm" />
            ) : (
              <p className="m-0 pt-1 text-font-family" onClick={handleSubmit}>
                Update
              </p>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default EditProfileModal;
