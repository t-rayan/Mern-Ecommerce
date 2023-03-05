import { Box, Flex, Grid, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { hideSidebar } from "../features/ui/uiSlice";
import useMedia from "../hooks/useMedia";

const SidemenuItem = ({ menuTitle, linkIcon, place }) => {
  const { isMobile, isTablet, isLargeDevice } = useMedia();
  const dispatch = useDispatch();
  const { isSidebar } = useSelector((state) => state.ui);

  return (
    <NavLink
      to={`${place}`}
      end
      onClick={() => isSidebar && dispatch(hideSidebar())}
    >
      {({ isActive }) => (
        <Flex
          alignItems="center"
          justifyContent="start"
          color={isActive ? "gray.700" : "gray.500"}
          borderRight={isActive && "3px solid"}
          borderRightColor={isActive && "orange"}
          py={2}
          px={"2rem"}
          _hover={{ color: "gray.700" }}
          fontSize={[".8rem", ".9rem", ".9rem"]}
          gap={3}
          mb={5}
        >
          {/* <Icon
              as={linkIcon}
              w="20px"
              h="20px"
              color={isActive && "orange.400"}
            /> */}
          <Box>
            <Text fontWeight="bold" ml={2}>
              {menuTitle}
            </Text>
          </Box>
        </Flex>
      )}
    </NavLink>
  );
};

export default SidemenuItem;
