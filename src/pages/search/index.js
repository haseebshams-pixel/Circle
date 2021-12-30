import React from "react";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FriendsCard from "../../shared/components/common/friendsCard";

function Search() {
  return (
    <div className="container">
      <h3>Search a friend</h3>
      <div data-aos="fade-up" data-aos-duration="500">
        <Row className="pt-3">
          <Col>
            <Form.Control placeholder="Search" size="lg" />
          </Col>
        </Row>
        <Row>
          <Col className="p-3">
            <FriendsCard />
          </Col>
          <Col className="p-3">
            <FriendsCard />
          </Col>
          <Col className="p-3">
            <FriendsCard />
          </Col>
          <Col className="p-3">
            <FriendsCard />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Search;
