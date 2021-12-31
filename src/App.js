import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import AuthRoute from "./shared/routes/authRoute";
import AOS from "aos";
import "aos/dist/aos.css";
import Toast from "./shared/components/common/toast";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

AOS.init();
const history = createHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <AuthRoute />
        </Switch>
      </Router>
      <Toast />
    </div>
  );
}

export default App;
