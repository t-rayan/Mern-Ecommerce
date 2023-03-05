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
      <Icon as={RiMenu3Line} w={6} h={6} />
    </Box>
  );
};

export default MenuToggler;
