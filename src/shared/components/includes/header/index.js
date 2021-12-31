import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../../redux/reducers/userSlice";
import avatarBaseUrl from "../../../utilities/avatarBaseUrl";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import LoginModal from "../../modal/login";
import SignupModal from "../../modal/signUp";
import SideNav from "./sideNav";

import { useHistory } from "react-router-dom";
import { ProfilePlaceHolder } from "../../../../assets";

import "./style.css";
import Request from "../../modal/requests";

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
            localStorage.removeItem("token");
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  const [isOpen, setOpen] = useState(false);
  const [isOpen1, setOpen1] = useState(false);
  const [isOpen2, setOpen2] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const openModal1 = () => setOpen1(true);
  const closeModal1 = () => setOpen1(false);
  const openModal2 = () => setOpen2(true);
  const closeModal2 = () => setOpen2(false);
  const openSideNav = () => setOffCanvas(true);
  const closeSideNav = () => setOffCanvas(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.root.user);
  const name = user.user.firstname;

  const navigate = (id) => {
    console.log(user.user.id);
    history.push(`/Profile/${id}`);
    window.location.reload();
  };

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
                  <li>
                    <Link to="/" className="text-font-family">
                      Home
                    </Link>
                  </li>
                  {user?.isLoggedIn && (
                    <>
                      <li>
                        <Link to="/CreatePost" className="text-font-family">
                          Create Post
                        </Link>
                      </li>
                    </>
                  )}
                  <li role="button">
                    <Link to="/search">
                      <img
                        src={
                          require("../../../../assets/icons/search.svg").default
                        }
                      />
                    </Link>
                  </li>
                  {user?.isLoggedIn && (
                    <>
                      <li role="button" className="mr-3" onClick={openModal2}>
                        <FontAwesomeIcon icon={faBell} />
                      </li>
                    </>
                  )}
                </ul>
              </nav>
              {!user?.isLoggedIn && (
                <div className="header-btn">
                  <a
                    className="custom-site-btn text-font-family"
                    onClick={openModal1}
                    role="button"
                  >
                    Create Account
                  </a>
                  <a
                    className="custom-site-btn custom-site-btn2 text-font-family"
                    onClick={openModal}
                    role="button"
                  >
                    Login
                  </a>
                </div>
              )}

              {user?.isLoggedIn && (
                <Link onClick={() => navigate(user.user.id)}>
                  <div className="profile-ctn">
                    <img
                      src={
                        user?.user?.avatar
                          ? `${avatarBaseUrl}${user.user.avatar}`
                          : ProfilePlaceHolder
                      }
                      className="profile-pic"
                    />
                    <p className="profile-amount text-font-family">{name}</p>
                  </div>
                </Link>
              )}

              {user?.isLoggedIn && (
                <button
                  onClick={signOutPressHandler}
                  className="custom-site-btn3 text-font-family"
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
      <LoginModal openModal={isOpen} HideModal={closeModal} />
      <SignupModal openModal={isOpen1} HideModal={closeModal1} />
      <Request openModal={isOpen2} HideModal={closeModal2} />
    </div>
  );
}
