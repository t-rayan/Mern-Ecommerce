import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getUser, logoutUser } from "../features/auth/authSlice";

const Protected = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, status } = useSelector((state) => state.auth);

  useEffect(() => {
    userInfo && dispatch(getUser());
    if (status === 401) {
      logoutUser();
      navigate("/");
    }
  }, [dispatch, navigate, status, userInfo]);

  if (userInfo) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} repace />;
  }
};

export default Protected;
