import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkLogin, loggedInSelector, useAppDispatch, useAppSelector } from "../redux";

function PublicRoute() {
  const loggedIn = useAppSelector(loggedInSelector);
  const dispatch = useAppDispatch();
  const loginNext = localStorage.getItem("login-next");

  if (!loggedIn) {
    dispatch(checkLogin());
  }

  if (loggedIn) {
    if (loginNext) {
      return <Navigate to={loginNext} replace />;
    }
    return <Outlet />;
  }

  return <Outlet />;
}

export default PublicRoute;
