import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

const LoadingState = ({ title }) => {
  return (
    <Box
      h="100vh"
      w="100vw"
      position="fixed"
      bg="black"
      opacity={0.5}
      display="flex"
      justifyContent="center"
      placeItems="center"
      zIndex="1111"
      top={0}
      left={0}
    >
      <Box
        display="grid"
        bg="gray.900"
        placeItems="center"
        padding="3rem 4rem"
        shadow="lg"
        borderRadius="10px"
      >
        <Spinner
          thickness="17px"
          speed="2s"
          emptyColor="green"
          color="orange"
          size="lg"
        />
        <Text fontSize="1.2rem" fontWeight="semibold" mt={3} color="white">
          {title ? title : "Loading"}
        </Text>
      </Box>
    </Box>
  );
};

export default LoadingState;
