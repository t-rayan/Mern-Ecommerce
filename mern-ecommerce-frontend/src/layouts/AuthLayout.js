import { Box, Button, Grid } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();
  return (
    <Grid w="100%" placeItems={"center"} h="100vh" bg="gray.100">
      <Grid w="100%" px={5} placeItems="center">
        <Box textAlign={"center"}>
          <Button
            size={"lg"}
            colorScheme="blue"
            variant={"link"}
            mb={5}
            onClick={() => navigate("/")}
          >
            Tech-Hive
          </Button>
        </Box>
        <Box w="100%" bg={"white"} p={"1.8rem"} rounded="md" shadow={"sm"}>
          {children}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
