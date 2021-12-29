import React from "react";
import { useSelector } from "react-redux";

import "./style.css";
function Profile() {
  const user = useSelector((state) => state.root.user);
  const name = user.user.firstname + " " + user.user.lastname;
  return (
    <div className="container">
      <h3>Profile</h3>
      <div class="py-5 px-4">
        <div class="">
          <div class="bg-white shadow rounded overflow-hidden">
            <div class="px-4 pt-0 pb-4 cover">
              <div class="media align-items-end profile-head">
                <div class="profile mr-3">
                  <img
                    src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
                    alt="..."
                    width="130"
                    class="rounded mb-2 img-thumbnail"
                  />
                  <a href="#" class="btn btn-outline-dark btn-sm btn-block">
                    Edit profile
                  </a>
                </div>
                <div class="media-body mb-5 text-white">
                  <h4 class="mt-0 mb-0">{name}</h4>
                  <p class="small mb-4">
                    {" "}
                    <i class="fas fa-map-marker-alt mr-2"></i>
                  </p>
                </div>
              </div>
            </div>
            <div class="bg-light p-4 d-flex justify-content-end text-center">
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <h5 class="font-weight-bold mb-0 d-block">215</h5>
                  <small class="text-muted">
                    {" "}
                    <i class="fas fa-image mr-1"></i>Friends
                  </small>
                </li>
              </ul>
            </div>
            <div class="px-4 py-3">
              <h5 class="mb-0">Bio</h5>
              <div class="p-4 rounded shadow-sm bg-light">
                <p class="font-italic mb-0">Web Developer</p>
              </div>
            </div>
            <div class="py-4 px-4">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <h5 class="mb-0">Posts</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
