import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";

function RequestCard({ id, HideModal }) {
  const user = useSelector((state) => state.root.user);
  const [currentUser, setCurrentUser] = useState({});
  const acceptRequest = () => {
    axios
      .get(`friends/confirm/${id}`, {
        headers: {
          "x-auth-token": user.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          HideModal();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const rejectRequest = () => {
    axios
      .get(`friends/reject/${id}`, {
        headers: {
          "x-auth-token": user.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          HideModal();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getUser = () => {
    axios
      .get(`users/${id}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setCurrentUser(res.data);
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
    <>
      <div className="d-flex flex-row justify-content-between">
        <div className="d-flex flex-row">
          <p>
            <b>
              {currentUser?.firstname} {currentUser?.lastname}
            </b>
          </p>
          <p className="ml-1">sent you a friend request</p>
        </div>
        <div className="d-flex flex-row">
          <FontAwesomeIcon
            icon={faCheck}
            className="mr-4"
            color="green"
            role="button"
            onClick={() => acceptRequest()}
          />
          <FontAwesomeIcon
            icon={faTimes}
            color="red"
            role="button"
            onClick={() => rejectRequest()}
          />
        </div>
      </div>
    </>
  );
}

export default RequestCard;
