import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Icon,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FaCog,
  FaInfo,
  FaSignOutAlt,
  FaUserAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useMedia from "../hooks/useMedia";

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
        bg="blue.100"
        as={Box}
        borderRadius="30px"
        px="3"
        py="2"
        cursor={"pointer"}
      >
        <Box display={"flex"} alignItems="center" gap={2}>
          <Avatar
            size={sm ? "xs" : "xs"}
            bg="blue.500"
            icon={<FaUserAlt fontSize={sm ? ".8rem" : ".9rem"} />}
          />

          <Icon w="1.3rem" h="1.3rem" as={ChevronDownIcon} color="blue.500" />
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

export default UserAvatar;
