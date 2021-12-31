import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import photosBaseUrl from "../../../utilities/photosBaseUrl";

import "./style.css";

function PostCard({ data }) {
  const [user, setUser] = useState({});
  const [date, setDate] = useState("");
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);

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
  const formatDate = () => {
    let unformatedDate = data.date;
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
    setDate(formatedDate);
  };
  const getLikes = () => {
    let id = data._id;
    axios
      .get(`reacts/${id}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setLikes(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getComments = () => {
    let id = data._id;
    axios
      .get(`comments/${id}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setComments(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getUser();
    getLikes();
    getComments();
    formatDate();
  }, []);
  return (
    <div className="card-container" role="button">
      <Card className="card-main-container">
        <Card.Body>
          <Card.Title>
            {user.firstname} {user.lastname}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
          <Card.Text>{data.text}</Card.Text>
          {data.images.length != 0 ? (
            <>
              <Carousel className="carosal">
                {data.images.map((item, index) => {
                  return (
                    <Carousel.Item key={index}>
                      <img
                        className="carosal-image"
                        src={`${photosBaseUrl}${item}`}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </>
          ) : null}
          <div className="d-flex flex-row align-items-center">
            <Card.Link href="#" className="btn btn-sm btn-danger m-0">
              Like
            </Card.Link>
            <Card.Link className="ml-1" role="none">
              {likes?.likedBy?.length} Likes
            </Card.Link>
            <Card.Link role="button" className="ml-1">
              {comments?.length} Comments
            </Card.Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PostCard;
