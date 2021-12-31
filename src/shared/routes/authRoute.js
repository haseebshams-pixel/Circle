import React from "react";
import Header from "../components/includes/header/index";
import { useSelector } from "react-redux";
import Layout from "./layout";
import { allPublicRoute, logedInRoute } from "./allRoute";
import { Route } from "react-router-dom";
function AuthRoute() {
  const { user, loader } = useSelector((state) => state.root);
  return (
    <div style={{ position: "relative" }}>
      <Header />
      {user.isLoggedIn
        ? logedInRoute.map((route, inx) => {
            return (
              <Route
                key={inx}
                path={route.path}
                exact={true}
                render={(props) => {
                  return <Layout {...props} {...route} />;
                }}
              />
            );
          })
        : allPublicRoute.map((route, inx) => {
            return (
              <Route
                key={inx}
                path={route.path}
                exact={true}
                render={(props) => {
                  return <Layout {...props} {...route} />;
                }}
              />
            );
          })}
    </div>
  );
}

export default AuthRoute;
