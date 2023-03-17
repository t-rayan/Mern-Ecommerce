import {
  Box,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { RiShoppingBagFill, RiUser2Line } from "react-icons/ri";
import Searchbar from "./Searchbar";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import GetInitials from "../utils/GetInitials";

import { logoutUser } from "../features/auth/authSlice";
import useMedia from "../hooks/useMedia";
import MenuToggler from "./MenuToggler";
import { FaCog, FaInfo, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const ShopNavbar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    return <Navigate to="/login" />;
  };

  const { sm, md, lg } = useMedia();
  const getNavbarWidth = () => {
    if (sm || md) {
      return "100%";
    } else if (lg) {
      return "calc(100% - 240px)";
    } else {
      return "calc(100% - 280px)";
    }
  };

  return (
    <>
      <Box
        px={sm ? 5 : 10}
        py={5}
        area={"header"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={sm ? 3 : 10}
        maxH="6rem"
        pos="fixed"
        top="0"
        right="0"
        bg="white"
        w={getNavbarWidth()}
        zIndex="111"
        shadow={"sm"}
      >
        <Box flexBasis="35rem" display={"flex"} gap={1} alignItems="center">
          {(sm || md) && (
            <Box flex="none">
              <MenuToggler />
            </Box>
          )}
          <Box flex="1">
            {" "}
            <Searchbar />
          </Box>
        </Box>
        <HStack spacing={10}>
          <IconButton
            rounded={"lg"}
            shadow="md"
            colorScheme="purple"
            aria-label="Cart"
            size={sm ? "md" : "md"}
            icon={<RiShoppingBagFill />}
            onClick={() => navigate("/mycart")}
          />{" "}
          {/* check if user is logged in */}
          {userInfo && <UserAvatar handleLogout={handleLogout} />}
          {!userInfo && (
            <IconButton
              rounded={"lg"}
              shadow="md"
              colorScheme="gray"
              aria-label="Account"
              size={sm ? "md" : "md"}
              icon={<RiUser2Line />}
              onClick={() => navigate("/login")}
            />
          )}
        </HStack>
      </Box>
    </>
  );
};

// user avatar if user is logged in
const UserAvatar = ({ handleLogout }) => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const handleUserProfilePage = (e) => {
    e.preventDefault();
    navigate(`user/${userInfo?.id}`);
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        shadow="md"
        aria-label="Options"
        // w="2.9rem"
        // h="2.9rem"
        // icon={<HamburgerIcon />}
        variant="outline"
        bg="orange.400"
        children={GetInitials(userInfo?.fullname)}
        border="2px solid"
        borderColor={"orange.400"}
        rounded={"lg"}
        color="white"
      />
      <MenuList fontSize={"1rem"} color="gray.600" fontWeight="900">
        <MenuItem icon={<FaUserCircle />} onClick={handleUserProfilePage}>
          My Profile
        </MenuItem>
        <MenuItem icon={<FaCog />}>Settings</MenuItem>
        <MenuItem icon={<FaInfo />}>Help</MenuItem>
        <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ShopNavbar;
