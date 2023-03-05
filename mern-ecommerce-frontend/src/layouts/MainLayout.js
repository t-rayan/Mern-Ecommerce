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
import Navbar from "../components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";
import useMedia from "../hooks/useMedia";
import UserSideMenu from "../components/UserSideMenu";
import { widthAdjuster } from "../utils/Responsive";
import { useSelector } from "react-redux";
import ShopNavbar from "../components/ShopNavbar";
import Searchbar from "../components/Searchbar";
import {
  RiAccountBoxLine,
  RiMenu3Line,
  RiShoppingBagFill,
  RiUser2Line,
  RiUser5Line,
} from "react-icons/ri";

import SidemenuItem from "../components/SidemenuItem";
import { FaMobile, FaPhone } from "react-icons/fa";
import MenuToggler from "../components/MenuToggler";
import MenuDrawer from "../components/MenuDrawer";

const MainLayout = ({ children }) => {
  const { onOpen } = useDisclosure();

  // const { isMobile, isTablet, isMedium, isLargeDevice } = useMedia();
  const { isSidebar, currentDevice } = useSelector((state) => state.ui);

  const dynamicWidth = widthAdjuster(currentDevice, isSidebar);

  const { sm, md, lg, xl, xxl } = useMedia();

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

  const { tempAreas, showSidbar } = getResponsiveSidebar();

  return (
    <>
      {(sm || md) && <MenuDrawer />}

      <Grid
        templateAreas={tempAreas}
        gridTemplateRows={"90px 1fr"}
        gridTemplateColumns={{ xl: "280px 1fr", lg: "240px 1fr", md: "1fr" }}
        h="100vh"
      >
        <GridItem
          px={sm ? 5 : 10}
          py={5}
          area={"header"}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={sm ? 3 : 10}
        >
          <Box flexBasis="35rem" display={"flex"} gap={1}>
            {(sm || md) && <MenuToggler />}
            <Searchbar />
          </Box>
          <HStack spacing={2}>
            <IconButton
              rounded={"lg"}
              shadow="md"
              colorScheme="purple"
              aria-label="Cart"
              size={sm ? "md" : "lg"}
              icon={<RiShoppingBagFill />}
            />{" "}
            <IconButton
              rounded={"lg"}
              shadow="md"
              colorScheme="gray"
              aria-label="Account"
              size={sm ? "md" : "lg"}
              icon={<RiUser2Line />}
            />{" "}
          </HStack>
        </GridItem>
        {showSidbar && (
          <GridItem bg="blackAlpha.50" maxH="100%" area={"nav"}>
            <UserSideMenu />
          </GridItem>
        )}
        <GridItem px={sm ? 5 : 10} py={5} area={"main"} overflowY="scroll">
          <Outlet />
        </GridItem>
      </Grid>
    </>
  );
};

export default MainLayout;
