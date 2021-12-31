import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import RequestCard from "../../common/requestCard";

function Request({ openModal, HideModal }) {
  const user = useSelector((state) => state.root.user);
  const [pending, setPending] = useState([]);

  const getPendingRequests = () => {
    axios
      .get(`friends/pending`, {
        headers: {
          "x-auth-token": user.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          setPending(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getPendingRequests();

  return (
    <>
      <Modal
        size="lg"
        backdrop="static"
        show={openModal}
        onHide={HideModal}
        centered
      >
        <button
          type="button"
          className="close custom-modal-close"
          onClick={HideModal}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="login-modal-body">
          <p className="login-heading pb-1">Friend Requests</p>
          <div className="col">
            {pending.map((item, index) => {
              return (
                <RequestCard id={item} key={index} HideModal={HideModal} />
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Request;
