import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Restricted = ({ children }) => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default Restricted;
