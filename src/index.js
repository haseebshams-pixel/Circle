import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "../src/shared/redux/store";
import { persistor } from "../src/shared/redux/store";
import { Provider } from "react-redux";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "http://localhost:8000/api/";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
