import Home from "../../pages/home";
import CreatePost from "../../pages/createpost";
import Profile from "../../pages/profile";

let allPublicRoute = [
  {
    path: "/",
    component: Home,
    name: "Home",
  },
];
let logedInRoute = [
  {
    path: "/",
    component: Home,
    name: "Home",
  },
  {
    path: "/CreatePost",
    component: CreatePost,
    name: "Create Post",
  },
  {
    path: "/Profile",
    component: Profile,
    name: "Profile",
  },
];
export { allPublicRoute, logedInRoute };
