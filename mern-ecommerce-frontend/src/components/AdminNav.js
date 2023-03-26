import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Icon,
} from "@chakra-ui/react";
import {
  FaCog,
  FaInfo,
  FaSignOutAlt,
  FaUserAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import useMedia from "../hooks/useMedia";
import { getCurrentDateWithDayName, getFullDate } from "../utils/DateModifiers";
import GetInitials from "../utils/GetInitials";
import MenuToggler from "./MenuToggler";

// custom component for usernav
const AdminNav = () => {
  const { sm, md, lg } = useMedia();
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const d = new Date();

  const handleLogout = () => {
    dispatch(logoutUser());
    return <Navigate to="/login" />;
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
  return (
    <>
      <Box
        px={sm ? 5 : 10}
        py={5}
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
          <Text color="gray.500"> {getCurrentDateWithDayName()} </Text>
        </Box>
        <HStack>
          {/* check if user is logged in */}
          {userInfo && <UserAvatar handleLogout={handleLogout} />}
        </HStack>
      </Box>
    </>
  );
};

// user avatar if user is logged in
const UserAvatar = ({ handleLogout }) => {
  const navigate = useNavigate();
  const { sm } = useMedia();

  const { userInfo } = useSelector((state) => state.auth);

  const handleUserProfilePage = (e) => {
    e.preventDefault();
    navigate(`user/${userInfo?.id}`);
  };

  const getFirstName = () => {
    const fullName = userInfo?.fullname;
    const nameArr = fullName.split(" ");
    return nameArr[0];
  };

  const firstName = getFirstName();

  return (
    <Menu>
      <MenuButton
        as={Box}
        bg="blue.50"
        borderRadius="30px"
        px="3"
        py="2"
        cursor={"pointer"}
      >
        <Box display={"flex"} alignItems="center" gap={2}>
          <Avatar
            size={sm ? "xs" : "sm"}
            bg="blue.400"
            icon={<FaUserAlt fontSize={sm ? ".8rem" : ".9rem"} />}
          />
          <Flex direction={"column"} mr="1">
            <Text
              fontWeight={"bold"}
              fontSize={".7rem"}
              textTransform="capitalize"
            >
              {firstName}
            </Text>
            <Text fontSize={".7rem"}>{userInfo?.isAdmin && "Admin"}</Text>
          </Flex>
          <Icon w="1.3rem" h="1.3rem" as={ChevronDownIcon} color="blue.400" />
        </Box>
      </MenuButton>
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

export default AdminNav;
