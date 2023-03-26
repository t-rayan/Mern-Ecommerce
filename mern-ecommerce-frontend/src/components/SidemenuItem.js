import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { hideSidebar } from "../features/ui/uiSlice";

const SidemenuItem = ({ menuTitle, linkIcon, place, queryParamHandler }) => {
  const dispatch = useDispatch();
  const { isSidebar } = useSelector((state) => state.ui);

  const handleMenuItemClick = (event) => {
    isSidebar && dispatch(hideSidebar());
  };

  return (
    <NavLink to={`${place}`} onClick={handleMenuItemClick} end>
      {({ isActive }) => (
        <Flex
          alignItems="center"
          justifyContent="start"
          color={isActive ? "blue.400" : "gray.500"}
          // borderRight={isActive && "3px solid"}
          // borderRightColor={isActive && "purple.500"}
          rounded="md"
          bg={isActive ? "blue.50" : "none"}
          py={4}
          mx={"2rem"}
          px={4}
          _hover={{ color: "gray.700" }}
          fontSize={[".8rem", ".9rem", "1rem", ".9rem"]}
          gap={2}
          mb={3}
        >
          {/* <Icon
              as={linkIcon}
              w="20px"
              h="20px"
              color={isActive && "orange.400"}
            /> */}
          <Box>
            <Text fontWeight="semibold" ml={2}>
              {menuTitle}
            </Text>
          </Box>
        </Flex>
      )}
    </NavLink>
  );
};

export default SidemenuItem;
