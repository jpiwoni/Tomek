import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { checkLogin, loggedInSelector, useAppDispatch, useAppSelector } from "../redux";

function PrivateRoute() {
  const loggedIn = useAppSelector(loggedInSelector);
  const dispatch = useAppDispatch();
  const location = useLocation();

  if (!loggedIn) {
    dispatch(checkLogin());
  }

  if (!loggedIn && location.pathname !== "/") {
    localStorage.setItem("login-next", `${location.pathname}${location.search}`);
  }

  if (loggedIn) {
    localStorage.removeItem("login-next");
  }

  return loggedIn ? <Outlet /> : <Navigate to="/" replace />;
}

export default PrivateRoute;
