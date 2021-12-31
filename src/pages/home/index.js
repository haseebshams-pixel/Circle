import React, { useEffect, useState } from "react";
import PostCard from "../../shared/components/common/postCard";
import axios from "axios";
import { Pic1, Pic2, Pic3 } from "../../assets/index";

import "./style.css";

const data = {
  id: "61cc4451258f3045560e54e7",
  text: "Hello name is salman, add me !",
  images: [{ imageURL: Pic1 }, { imageURL: Pic2 }, { imageURL: Pic3 }],
  postedBy: "61cc856c722809580f7ba112",
  date: "2021-12-29",
  _v: 0,
};
function Home() {
  const [posts, setPosts] = useState([]);
  const getPost = () => {
    axios
      .get("posts/")
      .then((res) => {
        if (res.statusText === "OK") {
          setPosts(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getPost();
  }, []);
  return (
    <div className="container">
      <h3>Home</h3>
      <div className="space" />
      {posts.map((item, key) => {
        return (
          <div data-aos="fade-up" data-aos-duration="500" key={key}>
            <PostCard data={item} />
          </div>
        );
      })}
    </div>
  );
}

export default Home;
