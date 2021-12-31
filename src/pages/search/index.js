import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import UserCard from "../../shared/components/common/userCard";

function Search() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const handleChange = (e) => {
    setResults([]);
    if (e.key === "Enter") {
      setSearch(e.target.value);
      let formData = {
        name: search,
      };
      axios
        .post("search", formData)
        .then((res) => {
          if (res.statusText === "OK") {
            setResults(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="container">
      <h3>Search a friend</h3>
      <div data-aos="fade-up" data-aos-duration="500">
        <Row className="pt-3">
          <Col>
            <Form.Control
              type="text"
              placeholder="Search"
              size="lg"
              onKeyPress={handleChange}
            />
          </Col>
        </Row>
        <Row>
          {results.map((item, index) => {
            return (
              <Col className="p-3" key={index}>
                <Link
                  to={`/Profile/${item}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <UserCard id={item} />
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default Search;
