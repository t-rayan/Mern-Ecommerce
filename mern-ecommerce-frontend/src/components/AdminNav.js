import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack, Text, Icon } from "@chakra-ui/react";

import { MdCalendarToday } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import useMedia from "../hooks/useMedia";
import { getCurrentDateWithDayName } from "../utils/DateModifiers";
import MenuToggler from "./MenuToggler";
import UserAvatar from "./UserAvatar";

// custom component for usernav
const AdminNav = () => {
  const { sm, md, lg } = useMedia();
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

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
        <Box flexBasis="35rem" display={"flex"} gap={2} alignItems="center">
          {(sm || md) && (
            <Box flex="none">
              <MenuToggler />
            </Box>
          )}
          <Flex alignItems={"center"} gap={2}>
            <Icon color="blue.500" as={MdCalendarToday} />
            <Text color="gray.500" fontSize={sm ? ".8rem" : "1rem"}>
              {" "}
              {getCurrentDateWithDayName()}{" "}
            </Text>
          </Flex>
        </Box>
        <HStack>
          {/* check if user is logged in */}
          {userInfo && <UserAvatar handleLogout={handleLogout} />}
        </HStack>
      </Box>
    </>
  );
};

export default AdminNav;
