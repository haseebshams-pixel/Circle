import React, { useState } from "react";
import { Spinner, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { toastMessage } from "../../shared/components/common/toast";

function CreatePost() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [text, setText] = useState("");
  const [photos, setPhotos] = useState(null);
  const user = useSelector((state) => state.root.user);
  const handleSubmit = async () => {
    setSubmitting(true);
    let formData = new FormData();
    if (photos === null && text === "") {
      setSubmitting(false);
      toastMessage("Write Something", "error");
    } else {
      if (photos != null) {
        for (let i = 0; i < photos.length; i++) {
          formData.append("photos", photos[i]);
        }
        //formData.append("photos", photos);
      }
      formData.append("text", text);
      console.log(photos);
      axios
        .post("posts/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": user.token,
          },
        })
        .then((res) => {
          if (res.statusText === "OK") {
            setSubmitting(false);
            setText("");
            toastMessage("Posted Successfully", "success");
          }
        })
        .catch((error) => {
          console.log(error);
          setSubmitting(false);
          toastMessage("Error Posting", "error");
        });
    }
  };
  const changePhotos = (e) => {
    console.log(e.target.files);
    setPhotos(e.target.files);
  };
  return (
    <div className="container">
      <h3>Create a Post</h3>
      <Form data-aos="fade-up" data-aos-duration="500">
        <Row className="pt-3">
          <Col>
            <Form.Control
              as="textarea"
              rows={5}
              value={text}
              placeholder="whats new?"
              className="text-font-family"
              size="lg"
              onChange={(e) => setText(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="pt-3">
          <Col className="dobStyle">
            <input
              type="file"
              multiple
              role="button"
              onChange={(e) => changePhotos(e)}
            />
          </Col>
        </Row>
        <Button className="mt-3" size="md">
          {isSubmitting ? (
            <Spinner animation="grow" size="sm" />
          ) : (
            <div className="d-flex flex-row" onClick={() => handleSubmit()}>
              <p className="m-0 pt-1 text-font-family">Post</p>
              <FontAwesomeIcon icon={faPaperPlane} className="m-1" />
            </div>
          )}
        </Button>
      </Form>
    </div>
  );
}

export default CreatePost;
