import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

const LoadingState = ({ title }) => {
  return (
    <Box display={"grid"} placeItems="center" h="100%" w="100%">
      <Box
        display="flex"
        alignItems="center"
        justifyContent={"center"}
        flexDir="column"
        w="10rem"
        h="8rem"
        bg="white"
        textAlign="center"
        rounded={"md"}
      >
        <Spinner colorScheme={"blue"} />
        <Text fontSize=".9rem" fontWeight="normal" mt={3} color="gray.500">
          {title ? title : "Loading"}
        </Text>
      </Box>
    </Box>
  );
};

export default LoadingState;
