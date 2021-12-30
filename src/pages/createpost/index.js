import React, { useState } from "react";
import { Spinner, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { toastMessage } from "../../shared/components/common/toast";

function CreatePost() {
  const [isSubmitting, setSubmitting] = useState(false);
  const handleSubmit = async () => {
    setSubmitting(true);
    toastMessage("Posted Successfully", "success");
    setSubmitting(false);
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
              placeholder="whats new?"
              className="text-font-family"
              size="lg"
            />
          </Col>
        </Row>
        <Row className="pt-3">
          <Col className="dobStyle">
            <Form.Control type="file" size="sm" multiple role="button" />
          </Col>
        </Row>
        <Button className="mt-3" size="md">
          {isSubmitting ? (
            <Spinner animation="grow" size="sm" />
          ) : (
            <div className="d-flex flex-row">
              <p className="m-0 pt-1 text-font-family" onClick={handleSubmit}>
                Post
              </p>
              <FontAwesomeIcon icon={faPaperPlane} className="m-1" />
            </div>
          )}
        </Button>
      </Form>
    </div>
  );
}

export default CreatePost;
