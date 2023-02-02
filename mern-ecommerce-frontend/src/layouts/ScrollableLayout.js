import { Box } from "@chakra-ui/react";
import React from "react";

const ScrollableLayout = ({ children }) => {
  return (
    <Box
      p={"3rem 2rem"}
      borderRadius="10px"
      shadow="lg"
      w="100%"
      overflowX={"scroll"}
    >
      {" "}
      {children}{" "}
    </Box>
  );
};

export default ScrollableLayout;
