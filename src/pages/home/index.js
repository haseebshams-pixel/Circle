import React, { useEffect, useState } from "react";
import PostCard from "../../shared/components/common/postCard";
import { useSelector } from "react-redux";
import axios from "axios";

import "./style.css";
import { Spinner } from "react-bootstrap";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.root.user);
  const getPost = () => {
    if (user.isLoggedIn) {
      axios
        .get("friends/posts", {
          headers: {
            "x-auth-token": user.token,
          },
        })
        .then((res) => {
          if (res.statusText === "OK") {
            setPosts(res.data);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get("posts/")
        .then((res) => {
          if (res.statusText === "OK") {
            setPosts(res.data);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    getPost();
  }, []);
  return (
    <div className="container">
      <h3>Home</h3>
      <div className="space" />
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" size="xl" />
        </div>
      ) : (
        posts.map((item, key) => {
          return (
            <div data-aos="fade-up" data-aos-duration="500" key={key}>
              <PostCard data={item} />
            </div>
          );
        })
      )}
    </div>
  );
}

export default Home;
