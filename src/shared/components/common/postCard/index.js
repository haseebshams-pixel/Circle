import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";

import "./style.css";

function PostCard({ data }) {
  const [user, setUser] = useState({});
  const getUser = () => {
    let id = data.postedBy;
    axios
      .get(`users/${id}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setUser(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="card-container">
      <Card className="card-main-container">
        <Card.Body>
          <Card.Title>
            {user.firstname} {user.lastname}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{data.date}</Card.Subtitle>
          <Card.Text>{data.text}</Card.Text>
          {data.images != null ? (
            <>
              <Carousel className="carosal">
                {data.images.map((item, index) => {
                  return (
                    <Carousel.Item key={index}>
                      <img
                        className="carosal-image"
                        src={item.imageURL}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </>
          ) : null}
          <Card.Link href="#" className="btn btn-sm btn-danger">
            Like
          </Card.Link>
          <Card.Link href="#">34 Comments</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PostCard;
