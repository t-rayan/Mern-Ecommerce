import { Box, Icon } from "@chakra-ui/react";
import React from "react";
import { RiMenu3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../features/ui/uiSlice";

const MenuToggler = () => {
  const dispatch = useDispatch();

  return (
    <Box
      display={"flex"}
      alignItems="center"
      onClick={() => dispatch(toggleSidebar())}
    >
      <Icon
        cursor={"pointer"}
        color="gray.500"
        as={RiMenu3Line}
        fontSize="1.2rem"
      />
    </Box>
  );
};

export default MenuToggler;
