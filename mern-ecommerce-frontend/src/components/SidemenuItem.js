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
          color={isActive ? "orange.500" : "gray.500"}
          borderRight={isActive && "3px solid"}
          borderRightColor={isActive && "orange.400"}
          py={2}
          px={"2rem"}
          _hover={{ color: "gray.700" }}
          fontSize={["1rem", ".9rem", "1rem", ".9rem"]}
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
