import { Box, calc, Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";
import useMedia from "../hooks/useMedia";
import UserSideMenu from "../components/UserSideMenu";
import { widthAdjuster } from "../utils/Responsive";
import { useSelector } from "react-redux";
import ShopNavbar from "../components/ShopNavbar";

const MainLayout = ({ children }) => {
  const { isMobile, isTablet, isMedium, isLargeDevice } = useMedia();
  const { isSidebar, currentDevice } = useSelector((state) => state.ui);

  const dynamicWidth = widthAdjuster(currentDevice, isSidebar);
  return (
    <Box>
      <Box>
        <UserSideMenu />
      </Box>
      <ShopNavbar />
      <Box
        minH="100vh"
        // w={dynamicWidth?.navbar}
        ml="auto"
        mt="5rem"
        px={isLargeDevice ? "3rem" : "1rem"}
        py={"4rem"}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
