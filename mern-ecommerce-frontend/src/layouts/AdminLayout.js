import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSideMenu from "../components/AdminSideMenu";
import { useDispatch, useSelector } from "react-redux";
import { widthAdjuster } from "../utils/Responsive";
import { useEffect } from "react";
import { getUser, reset } from "../features/auth/authSlice";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSidebar, currentDevice } = useSelector((state) => state.ui);
  const { userInfo, status } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const dynamicWidth = widthAdjuster(currentDevice, isSidebar);

  return (
    <Box>
      <Box>
        <AdminSideMenu />
      </Box>
      <Navbar />
      <Box minH="100vh" w={dynamicWidth?.navbar} ml={"auto"} mt="5rem" p={5}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
