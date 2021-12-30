import React from "react";
import PostCard from "../../shared/components/common/postCard";
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
  return (
    <div className="container">
      <h3>Home</h3>
      <div className="space" />
      <div data-aos="fade-up" data-aos-duration="500">
        <PostCard data={data} />
      </div>
      <div data-aos="fade-up" data-aos-duration="500">
        <PostCard data={data} />
      </div>
      <div data-aos="fade-up" data-aos-duration="500">
        <PostCard data={data} />
      </div>
    </div>
  );
}

export default Home;
