import Home from "../../pages/home";
import CreatePost from "../../pages/createpost";
import Profile from "../../pages/profile";
import Search from "../../pages/search";

let allPublicRoute = [
  {
    path: "/",
    component: Home,
    name: "Home",
  },
  {
    path: "/search",
    component: Search,
    name: "Search",
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
    path: "/Profile/:id",
    component: Profile,
    name: "Profile",
  },
  {
    path: "/search",
    component: Search,
    name: "Search",
  },
];
export { allPublicRoute, logedInRoute };
