import React from "react";
import {
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
const Alertbox = ({ msg, closeFunc }) => {
  const dispatch = useDispatch();

  return (
    <Alert status="error" borderRadius="md">
      <AlertIcon />
      {/* <AlertTitle mr={2}>Your browser is outdated!</AlertTitle> */}
      <AlertDescription fontSize=".8rem">{msg}</AlertDescription>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={() => dispatch(closeFunc())}
      />
    </Alert>
  );
};

export default Alertbox;
