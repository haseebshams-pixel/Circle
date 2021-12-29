import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./style.css";

const SideNav = ({ offCanvas, closeSideNav, user }) => {
  return (
    <>
      <div
        class={`offcanvas-backdrop ${offCanvas ? "show" : "fade"}`}
        onClick={closeSideNav}
      />
      <div
        role="dialog"
        aria-modal="true"
        class={`offcanvas offcanvas-end ${offCanvas && "show"}`}
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header">
          <div class="offcanvas-title" id="offcanvasNavbarLabel">
            <Link to="/" onClick={closeSideNav}>
              <h2>Circle</h2>
            </Link>
          </div>
          <i className="times" onClick={closeSideNav}>
            <FontAwesomeIcon icon={faTimes} />
          </i>
        </div>
        <div class="offcanvas-body">
          <div class="justify-content-end flex-grow-1 pe-3 navbar-nav">
            <ul>
              {user?.isLoggedIn && (
                <>
                  <li>
                    <Link to="/CreatePost" onClick={closeSideNav}>
                      Create Post
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/" onClick={closeSideNav}>
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
