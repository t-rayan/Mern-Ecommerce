import {
  Box,
  calc,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  IconButton,
  Spacer,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useMedia from "../hooks/useMedia";
import UserSideMenu from "../components/UserSideMenu";
import Searchbar from "../components/Searchbar";
import { RiShoppingBagFill, RiUser2Line } from "react-icons/ri";

import MenuToggler from "../components/MenuToggler";
import MenuDrawer from "../components/MenuDrawer";
import ShopNavbar from "../components/ShopNavbar";

const MainLayout = ({ children }) => {
  // const { isMobile, isTablet, isMedium, isLargeDevice } = useMedia();

  const { sm, md, lg, xl, xxl } = useMedia();
  const navigate = useNavigate();

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

  const { tempAreas, showSidbar } = getResponsiveSidebar();

  return (
    <>
      {(sm || md) && <MenuDrawer />}

      <ShopNavbar />

      {showSidbar && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width={lg ? "240px" : "280px"}
          bg="#eee"
          h="100%"
          zIndex={"222"}
        >
          <UserSideMenu />
        </Box>
      )}
      <Box
        px={sm ? 5 : 10}
        h="100%"
        width={getNavbarWidth()}
        ml="auto"
        pos={"relative"}
        overflowY="scroll"
        display="grid"
        pt="7.5rem"
        pb="1rem"
      >
        <Box>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
