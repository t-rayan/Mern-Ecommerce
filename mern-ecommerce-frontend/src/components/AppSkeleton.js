import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const AppSkeleton = () => {
  return (
    <Stack>
      <Skeleton startColor="gray.50" endColor="gray.100" height="40px" />
      <Skeleton startColor="gray.50" endColor="gray.100" height="40px" />
      <Skeleton startColor="gray.50" endColor="gray.100" height="40px" />
      <Skeleton startColor="gray.50" endColor="gray.100" height="40px" />
      <Skeleton startColor="gray.50" endColor="gray.100" height="40px" />
      <Skeleton startColor="gray.50" endColor="gray.100" height="40px" />
    </Stack>
  );
};

export default AppSkeleton;
