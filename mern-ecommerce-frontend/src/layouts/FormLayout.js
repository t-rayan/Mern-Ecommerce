import { Box, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import BackBtn from "../components/BackBtn";
import useMedia from "../hooks/useMedia";

const FormLayout = ({ title, children }) => {
  const { isMobile, isLargeDevice, isTablet } = useMedia();

  return (
    <Box p={2}>
      <Box display="flex" mb={5} alignItems="center" gap={3}>
        <BackBtn btnTitle={title} />
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default FormLayout;
