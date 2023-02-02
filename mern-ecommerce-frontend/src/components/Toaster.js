import React from "react";
import { useToast } from "@chakra-ui/react";

const Toaster = () => {
  const toast = useToast({
    position: "top",
    title: "Container style is updated",
  });
  return <>{toast()}</>;
};

export default Toaster;
