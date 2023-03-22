import { Box, Grid } from "@chakra-ui/react";
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <Grid h="100vh" placeItems="center">
      <Box>{children}</Box>
    </Grid>
  );
};

export default AuthLayout;
