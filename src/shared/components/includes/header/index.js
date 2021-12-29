import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../../redux/reducers/userSlice";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import LoginModal from "../../modal/login";
import SignupModal from "../../modal/signUp";
import SideNav from "./sideNav";

import { useHistory } from "react-router-dom";
import { ProfilePlaceHolder } from "../../../../assets";

import "./style.css";

export default function Header() {
  const history = useHistory();
  const [offCanvas, setOffCanvas] = useState(false);

  const signOutPressHandler = () => {
    confirmAlert({
      message: "Are you sure you want to Sign Out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            history.push("/");
            dispatch(resetUser());
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const [address, setAddress] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [isOpen1, setOpen1] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const openModal1 = () => setOpen1(true);
  const closeModal1 = () => setOpen1(false);
  const openSideNav = () => setOffCanvas(true);
  const closeSideNav = () => setOffCanvas(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.root.user);

  return (
    <div>
      <header>
        <div className="container">
          <div className="header-flex">
            <div className="logo">
              <Link to="/">
                <h2>Circle</h2>
              </Link>
            </div>
            <div className="cus-navigation">
              <nav>
                <ul>
                  {user?.isLoggedIn && (
                    <>
                      <li>
                        <Link to="/CreatePost">Create Post</Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                </ul>
              </nav>
              {!user?.isLoggedIn && (
                <div className="header-btn">
                  <a className="custom-site-btn" onClick={openModal1}>
                    Create Account
                  </a>
                  <a
                    className="custom-site-btn custom-site-btn2"
                    onClick={openModal}
                  >
                    Login
                  </a>
                </div>
              )}

              {user?.isLoggedIn && (
                <Link to="/Profile">
                  <div className="profile-ctn">
                    <img
                      src={
                        user?.user?.profilePic
                          ? user?.user?.profilePic + "?" + new Date().getTime()
                          : ProfilePlaceHolder
                      }
                      className="profile-pic"
                    />
                    <p className="profile-amount">Haseeb Shams</p>
                  </div>
                </Link>
              )}

              {user?.isLoggedIn && (
                <button
                  onClick={signOutPressHandler}
                  className="custom-site-btn3"
                >
                  Sign Out
                </button>
              )}
              <div className="menu-bar">
                <i className="hamburger" onClick={openSideNav}>
                  <FontAwesomeIcon icon={faBars} />
                </i>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="empty-header"></div>
      <SideNav offCanvas={offCanvas} closeSideNav={closeSideNav} user={user} />
      <LoginModal
        openModal={isOpen}
        HideModal={closeModal}
        OpenModal1={openModal1}
        setAddress={setAddress}
      />
      <SignupModal
        openModal={isOpen1}
        HideModal={closeModal1}
        address={address}
      />
    </div>
  );
}
