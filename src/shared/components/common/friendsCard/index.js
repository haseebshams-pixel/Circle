import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { ProfilePlaceHolder } from "../../../../assets";
import "./style.css";

function FriendsCard() {
  return (
    <div data-aos="fade-up" data-aos-duration="300">
      <Card style={{ width: "19.5rem" }} role="button">
        <div class="profile px-3 pt-3">
          <img
            src={ProfilePlaceHolder}
            alt="profilePic"
            width="130"
            class="rounded mb-2 img-thumbnail"
          />
        </div>
        <Card.Body>
          <Card.Title className="cardTextStyle">Salman Muzammil</Card.Title>
          <Card.Text className="cardTextLimit">
            Hi there! I am flatdietsoda. Nice to meet you guys. Have a nice day.
            Take care.
          </Card.Text>
          <Button variant="danger">Unfriend</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default FriendsCard;
