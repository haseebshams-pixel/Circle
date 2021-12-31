import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { ProfilePlaceHolder } from "../../../../assets";
import avatarBaseUrl from "../../../utilities/avatarBaseUrl";

function UserCard(props) {
  const [user, setUser] = useState([]);
  console.log(props.id);
  const getUser = () => {
    axios
      .get(`users/${props.id}`)
      .then((res) => {
        if (res.statusText === "OK") {
          console.log(res.data);
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
    <div data-aos="fade-up" data-aos-duration="300">
      <Card style={{ width: "19.5rem" }} role="button">
        <div class="profile px-3 pt-3">
          <img
            src={
              user?.avatar
                ? `${avatarBaseUrl}${user.avatar}`
                : ProfilePlaceHolder
            }
            alt="profilePic"
            width="130"
            class="rounded mb-2 img-thumbnail"
          />
        </div>
        <Card.Body>
          <Card.Title className="cardTextStyle">
            {user.firstname} {user.lastname}
          </Card.Title>
          <Card.Text className="cardTextLimit">{user.bio}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserCard;
