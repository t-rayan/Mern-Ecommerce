import { Box } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const AppModal = ({ children }) => {
  const { isModal } = useSelector((state) => state.ui);

  return (
    <>
      <Box
        w="100%"
        h="100vh"
        bg="black"
        opacity={0.4}
        pos="fixed"
        top="0"
        left="0"
        zIndex="999"
      ></Box>
      <Box
        pos="fixed"
        transform="translate(-50%, -50%)"
        borderRadius="10px"
        w="650px"
        h="500px"
        top="50%"
        left="50%"
        bg="white"
        zIndex="999"
      >
        {/* {children} */}
      </Box>
    </>
  );
};

export default AppModal;
