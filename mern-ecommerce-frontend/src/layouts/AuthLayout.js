import { Box, Button, Grid } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();
  return (
    <Grid placeItems={"center"} h="100vh" bg="gray.100">
      <Grid placeItems="center">
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

        <Box bg={"white"} p={"1.8rem"} rounded="md" shadow={"sm"}>
          {children}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
