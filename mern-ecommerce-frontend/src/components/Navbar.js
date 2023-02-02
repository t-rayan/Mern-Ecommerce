import React from "react";
import {
  Box,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Button,
  Icon,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { RiMenu2Line, RiShoppingBagLine } from "react-icons/ri";
import useMedia from "../hooks/useMedia";
import { toggleSidebar } from "../features/ui/uiSlice";
import GetInitials from "../utils/GetInitials";
import { widthAdjuster } from "../utils/Responsive";
import { current } from "@reduxjs/toolkit";

const Navbar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { isSidebar, currentDevice } = useSelector((state) => state.ui);

  const handleLogout = () => {
    dispatch(logoutUser());
    return <Navigate to="/login" />;
  };

  const dynamicWidth = widthAdjuster(currentDevice, isSidebar);
  return (
    <Box
      h="5rem"
      gridTemplateColumns=".1fr 1fr"
      gap="1rem"
      shadow={"sm"}
      // boxShadow="lg"
      // borderBottom="2px"
      borderColor="gray.200"
      display="grid"
      alignContent="center"
      justifyContent="space-between"
      alignItems="center"
      pos="fixed"
      top="0"
      right={0}
      px={5}
      bg="white"
      zIndex="11"
      w={dynamicWidth?.navbar}
    >
      <Box>
        <Icon
          as={RiMenu2Line}
          w={"20px"}
          h={"20px"}
          color="gray.400"
          cursor="pointer"
          _hover={{ color: "black" }}
          // display={isMobile ? "block" : "none"}
          onClick={() => dispatch(toggleSidebar())}
        />
        <Box />
      </Box>
      <Box>
        <UserNav
          dispatch={dispatch}
          handleLogout={handleLogout}
          currentDevice={currentDevice}
          userInfo={userInfo}
        />

        {userInfo && userInfo.isAdmin && (
          <AdminNav handleLogout={handleLogout} userInfo={userInfo} />
        )}
      </Box>
    </Box>
  );
};

export default Navbar;

// custom component for usernav
const UserNav = ({ currentDevice, dispatch, userInfo, handleLogout }) => {
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  return (
    <Box
      display="flex"
      justifyItems="end"
      alignItems="center"
      justifyContent="end"
      gap={5}
    >
      {/* shoppping cart icon */}
      {!userInfo?.isAdmin && (
        <Box
          display="flex"
          alignSelf="center"
          pos="relative"
          p={1}
          cursor="pointer"
          onClick={() => navigate("/checkout")}
        >
          <Icon as={RiShoppingBagLine} h={5} w={5} />
          {cartItems.length > 0 && (
            <Box h={2} w={2} bg="red.500" borderRadius="100%" />
          )}
        </Box>
      )}

      {/* Menu button icon */}
      {userInfo && !userInfo.isAdmin && (
        <Menu>
          <MenuButton
            bg="transparent"
            // p="1.5rem"
            p="0"
            _hover={{ bg: "transparent" }}
            _focus={{ outline: "none", bg: "transparent" }}
            _active={{ outline: "none", bg: "transparent" }}
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            <Box
              w={10}
              h={10}
              bg="green.300"
              borderRadius="100%"
              display="grid"
              placeItems="center"
            >
              <Text>{GetInitials(userInfo?.fullname)}</Text>
            </Box>
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link to={`/user/${userInfo.id}`}>Profile</Link>
            </MenuItem>
            <MenuItem>Settings</MenuItem>

            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      )}
      {/* auth liniks */}
      {!userInfo && (
        <Box display="flex" gap={3} justifyContent="end" alignItems="center">
          <Link to="/login" color="orange.400">
            Login
          </Link>
          {currentDevice !== "mobile" && <Link to="/register">Register</Link>}
        </Box>
      )}
    </Box>
  );
};

// custom component for usernav
const AdminNav = ({ isMobile, dispatch, userInfo, handleLogout }) => {
  return (
    <Box
      display="flex"
      justifyItems="end"
      alignItems="center"
      justifyContent="end"
      gap={3}
    >
      {userInfo && userInfo.isAdmin && (
        <Menu>
          <MenuButton
            bg="transparent"
            p="1.5rem"
            _hover={{ bg: "transparent" }}
            _focus={{ outline: "none", bg: "transparent" }}
            _active={{ outline: "none", bg: "transparent" }}
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            <Box
              w={10}
              h={10}
              bg="green.300"
              borderRadius="100%"
              display="grid"
              placeItems="center"
            >
              <Text>{GetInitials(userInfo?.fullname)}</Text>
            </Box>
          </MenuButton>
          <MenuList>
            <MenuItem>Settings</MenuItem>

            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      )}
    </Box>
  );
};
