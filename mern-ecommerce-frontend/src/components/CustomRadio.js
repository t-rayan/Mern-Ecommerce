import { Box, useRadio } from "@chakra-ui/react";
import React from "react";

function CustomRadio(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box
      display="flex"
      alignItems="center"
      borderRadius="10px"
      borderColor="gray.300"
      borderWidth="1px"
      p={"2rem"}
      gap={2}
    >
      <Box>
        <input {...input} />
        <Box
          {...checkbox}
          cursor="pointer"
          borderWidth="1px"
          borderRadius="50%"
          w={"30px"}
          h={"30px"}
          _checked={{
            bg: "teal.600",
            color: "white",
            borderColor: "teal.600",
          }}
          _focus={{
            boxShadow: "outline",
          }}
          px={5}
          py={3}
        />
      </Box>
      <Box>{props.children}</Box>
    </Box>
  );
}

export default CustomRadio;
