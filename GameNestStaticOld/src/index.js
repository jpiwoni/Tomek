import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import App from "./App";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer position="bottom-right" toastStyle={{ color: "white", backgroundColor: "#202427" }} />
    </Provider>
  </StrictMode>,
);