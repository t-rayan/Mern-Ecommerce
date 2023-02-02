import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  Select,
  Switch,
  Text,
} from "@chakra-ui/react";
import React from "react";

const NewAddrModal = ({ children }) => {
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
        zIndex="11"
      ></Box>
      <Box
        pos="fixed"
        transform="translate(-50%, -50%)"
        borderRadius="10px"
        w="650px"
        h="auto"
        top="50%"
        left="50%"
        bg="white"
        zIndex="999"
        p={"2rem"}
        display="flex"
        flexDir="column"
        gap={5}
      >
        {children}

        {/* <Box>
          <Heading size="md">Add new address</Heading> */}

        {/* country selection */}
        {/* <Grid p={4} shadow="md" borderRadius="5px" gap={2}>
            <Text fontWeight="medium">Country</Text>
            <Select>
              <option value="option1">Australia</option>
              <option value="option2">Nepal</option>
              <option value="option3">New Zealand</option>
            </Select>
          </Grid> */}

        {/* personal information */}
        {/* <Grid p={4} shadow="md" borderRadius="5px" gap={2}>
            <Text fontWeight="medium">Personal Information</Text>
            <Input type="text" placeholder="Contact Name" />

            <Grid templateColumns=".3fr 1fr" gap={3}>
              <Input type="text" value="+61" />
              <Input type="number" placeholder="Mobile Number" />
            </Grid>
          </Grid> */}

        {/* address information */}
        {/* <Grid p={4} shadow="md" borderRadius="5px" gap={2}>
            <Text fontWeight="medium">Address</Text>
            <Input type="text" placeholder="Address" />

            <Grid templateColumns="1fr 1fr .8fr" gap={3}>
              <Input type="text" placeholder="Town/City" />
              <Input type="text" placeholder="State" />
              <Input type="number" placeholder="Zip/Post" />
            </Grid>
          </Grid> */}

        {/* set as default */}
        {/* <Flex
            p={4}
            shadow="md"
            borderRadius="5px"
            gap={2}
            justifyContent="space-between"
          >
            <Text fontSize=".9rem">Set as default shipping address</Text>
            <Switch size="md" colorScheme="green" />
          </Flex> */}

        {/* action buttons */}
        {/* <Flex p={4} gap={2} justifyContent="flex-end">
            <Button size="sm" colorScheme="green">
              {" "}
              Save Address{" "}
            </Button>
            <Button size="sm" variant="outline" onClick={closeModal}>
              {" "}
              Cancel{" "}
            </Button>
          </Flex> */}
        {/* </Box> */}
      </Box>
    </>
  );
};

export default NewAddrModal;
