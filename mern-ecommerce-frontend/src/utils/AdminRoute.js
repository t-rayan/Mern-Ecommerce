import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getUser, logoutUser } from "../features/auth/authSlice";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    userInfo && dispatch(getUser());
    if (status === 401) {
      logoutUser();
      navigate("/");
    }
  }, [dispatch, navigate, status, userInfo]);

  if (userInfo && userInfo?.isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
