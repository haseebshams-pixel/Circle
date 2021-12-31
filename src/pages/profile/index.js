import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import axios from "axios";
import { setUser } from "../../shared/redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import "./style.css";
import { ProfilePlaceHolder, Pic1, Pic2, Pic3 } from "../../assets";
import PostCard from "../../shared/components/common/postCard";
import FriendsCard from "../../shared/components/common/friendsCard";
import EditProfileModal from "../../shared/components/modal/editProfile";
import avatarBaseUrl from "../../shared/utilities/avatarBaseUrl";

function Profile(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.root.user);
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const name = user.user.firstname + " " + user.user.lastname;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const getPost = () => {
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
  useEffect(() => {
    axios
      .get(`users/${props.match.params.id}`)
      .then((res) => {
        if (res.statusText === "OK") {
          let obj = {
            ...user,
          };
          obj.user = user.user;
          dispatch(setUser(obj));
        }
      })
      .catch((error) => {
        console.log(error);
      });
    getPost();
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
                      user?.user?.avatar
                        ? `${avatarBaseUrl}${user.user.avatar}`
                        : ProfilePlaceHolder
                    }
                    alt="profilePic"
                    width="130"
                    class="rounded mb-2 img-thumbnail main-profile-pic"
                  />
                  <a
                    role="button"
                    class="btn btn-outline-dark btn-sm btn-block text-font-family"
                    onClick={openModal}
                  >
                    Edit profile
                  </a>
                </div>
                <div class="media-body mb-5 text-white">
                  <h4 class="mt-0 mb-4 text-font-family">{name}</h4>
                </div>
              </div>
            </div>
            <div class="bg-light p-4 d-flex justify-content-end text-center">
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <h5 class="font-weight-bold mb-0 d-block text-font-family">
                    215
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
                <p class="font-italic mb-0 text-font-family">{user.user.bio}</p>
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
                    <div className="col- p-3" role="button">
                      <FriendsCard />
                    </div>
                    <div className="col- p-3" role="button">
                      <FriendsCard />
                    </div>
                    <div className="col- p-3" role="button">
                      <FriendsCard />
                    </div>
                    <div className="col- p-3" role="button">
                      <FriendsCard />
                    </div>
                    <div className="col- p-3" role="button">
                      <FriendsCard />
                    </div>
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
