import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import useMedia from "../hooks/useMedia";
import AdminSideMenu from "../components/AdminSideMenu";

import MenuDrawer from "../components/MenuDrawer";
import AdminNav from "../components/AdminNav";

const AdminLayout = () => {
  const { sm, md, lg } = useMedia();

  const getResponsiveSidebar = () => {
    if (sm || md) {
      return {
        tempAreas: `"header"
      "main"
      "main"`,
        showSidbar: false,
      };
    } else {
      return {
        tempAreas: `"nav header"
      "nav main"
      "nav main"`,
        showSidbar: true,
        sm: sm,
      };
    }
  };

  const getNavbarWidth = () => {
    if (sm || md) {
      return "100%";
    } else if (lg) {
      return "calc(100% - 240px)";
    } else {
      return "calc(100% - 280px)";
    }
  };

  const { showSidbar } = getResponsiveSidebar();

  return (
    <>
      {(sm || md) && <MenuDrawer />}

      <AdminNav />

      {showSidbar && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width={lg ? "240px" : "280px"}
          borderRight="1px solid #eee"
          h="100%"
          zIndex={"222"}
        >
          <AdminSideMenu />
        </Box>
      )}
      <Box
        px={sm ? 5 : 10}
        width={getNavbarWidth()}
        ml="auto"
        display="grid"
        pt="7.5rem"
        pb="1rem"
        bg="gray.100"
        minH={"100vh"}
      >
        <Box width={"100%"} overflowX="auto">
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default AdminLayout;
