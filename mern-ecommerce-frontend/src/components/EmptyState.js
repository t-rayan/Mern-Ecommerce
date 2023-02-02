import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaPlus } from "react-icons/fa";

const EmptyState = ({ title, goto }) => {
  return (
    <VStack
      bg="gray.300"
      mt="5rem"
      p="5rem"
      spacing={5}
      borderRadius="md"
      alignSelf="center"
    >
      <Heading size="sm">{`Add ${title} `}</Heading>
      <Text>{`There are no ${title} . Please start adding to see here.`}</Text>
      <Button
        colorScheme="teal"
        size="sm"
        leftIcon={<FaPlus />}
        borderRadius="full"
        onClick={() => goto()}
      >
        {" "}
        Add{" "}
      </Button>
    </VStack>
  );
};

export default EmptyState;
