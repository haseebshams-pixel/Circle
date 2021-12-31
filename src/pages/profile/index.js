import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import axios from "axios";
import { Spinner, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./style.css";
import { ProfilePlaceHolder } from "../../assets";
import PostCard from "../../shared/components/common/postCard";
import FriendsCard from "../../shared/components/common/friendsCard";
import EditProfileModal from "../../shared/components/modal/editProfile";
import avatarBaseUrl from "../../shared/utilities/avatarBaseUrl";

function Profile(props) {
  const history = useHistory();
  const user = useSelector((state) => state.root.user);
  const [friendStatus, setFriendStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const getPost = () => {
    setLoading(true);
    axios
      .get(`posts/user/${props.match.params.id}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setPosts(res.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getFriendShipStatus = () => {
    axios
      .get(`friends/check/${props.match.params.id}`, {
        headers: {
          "x-auth-token": user.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          setFriendStatus(true);
        } else {
          setFriendStatus(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getFriends = () => {
    setLoading(true);
    axios
      .get(`friends/user/${props.match.params.id}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setFriends(res.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navigate = (id) => {
    history.push(`/Profile/${id}`);
    window.location.reload();
  };
  const unfriend = () => {
    axios
      .get(`friends/remove/${props.match.params.id}`, {
        headers: {
          "x-auth-token": user.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          setFriendStatus(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get(`users/${props.match.params.id}`)
      .then((res) => {
        if (res.statusText === "OK") {
          console.log(res.data);
          setCurrentUser(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    getPost();
    getFriends();
    getFriendShipStatus();
  }, []);

  return (
    <>
      <div className="container" data-aos="fade-up" data-aos-duration="500">
        <div class="py-5 px-4">
          <div class="bg-white rounded overflow-hidden">
            <div class="px-4 pt-0 pb-4 cover">
              <div class="media align-items-end profile-head">
                <div class="profile mr-3">
                  <img
                    src={
                      currentUser?.id === user.user.id
                        ? user?.user?.avatar
                          ? `${avatarBaseUrl}${user?.user?.avatar}`
                          : ProfilePlaceHolder
                        : currentUser?.avatar
                        ? `${avatarBaseUrl}${currentUser.avatar}`
                        : ProfilePlaceHolder
                    }
                    alt="profilePic"
                    width="130"
                    class="rounded mb-2 img-thumbnail main-profile-pic"
                  />
                  {user?.user?.id === props.match.params.id ? (
                    <a
                      role="button"
                      class="btn btn-outline-dark btn-sm btn-block text-font-family"
                      onClick={openModal}
                    >
                      Edit profile
                    </a>
                  ) : friendStatus ? (
                    <a
                      role="button"
                      class="btn btn-outline-danger btn-sm btn-block text-font-family"
                      onClick={() => unfriend()}
                    >
                      Unfriend
                    </a>
                  ) : (
                    <a
                      role="button"
                      class="btn btn-outline-primary btn-sm btn-block text-font-family"
                    >
                      Add Friend
                    </a>
                  )}
                </div>
                <div class="media-body mb-5 text-white">
                  <h4 class="mt-0 mb-4 text-font-family">
                    {user?.user?.id === currentUser?.id
                      ? user?.user?.firstname + " " + user?.user?.lastname
                      : currentUser?.firstname + " " + currentUser?.lastname}
                  </h4>
                </div>
              </div>
            </div>
            <div class="bg-light p-4 d-flex justify-content-end text-center">
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <h5 class="font-weight-bold mb-0 d-block text-font-family">
                    {friends.length}
                  </h5>
                  <small class="text-muted">
                    {" "}
                    <i class="fas fa-image mr-1 text-font-family"></i>Friends
                  </small>
                </li>
              </ul>
            </div>
            <div class="px-4 py-3">
              <h5 class="mb-0 text-font-family">Bio</h5>
              <div class="p-4 rounded shadow-sm bg-light">
                <p class="font-italic mb-0 text-font-family">
                  {user?.user?.id === currentUser?.id
                    ? user?.user?.bio
                    : currentUser?.bio}
                </p>
              </div>
            </div>
            <div class="py-4 px-4 mb-0">
              <Tabs
                defaultActiveKey="posts"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="posts" title="Posts">
                  {loading ? (
                    <div className="d-flex justify-content-center">
                      <Spinner animation="grow" size="xl" />
                    </div>
                  ) : (
                    posts.map((item, key) => {
                      return (
                        <div
                          data-aos="fade-up"
                          data-aos-duration="500"
                          key={key}
                        >
                          <PostCard data={item} />
                        </div>
                      );
                    })
                  )}
                </Tab>
                <Tab eventKey="friends" title="Friends">
                  <div className="row">
                    {loading ? (
                      <div className="d-flex justify-content-center">
                        <Spinner animation="grow" size="xl" />
                      </div>
                    ) : (
                      friends.map((item, key) => {
                        return (
                          <div
                            className="col- p-3"
                            role="button"
                            key={key}
                            onClick={() => navigate(item)}
                          >
                            <FriendsCard id={item} userId={user.user.id} />
                          </div>
                        );
                      })
                    )}
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <EditProfileModal openModal={isOpen} HideModal={closeModal} user={user} />
    </>
  );
}

export default Profile;
