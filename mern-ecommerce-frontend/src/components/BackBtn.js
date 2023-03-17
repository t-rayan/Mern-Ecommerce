import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const BackBtn = ({ btnTitle, iconSize, ...rest }) => {
  const navigate = useNavigate();
  return (
    <Flex>
      <Button
        p="0px"
        leftIcon={
          <ArrowBackIcon
            w={iconSize ? iconSize : "17px"}
            h={iconSize ? iconSize : "17px"}
          />
        }
        variant="ghost"
        _hover={{ bg: "transparent", color: "gray.400" }}
        _active={{ bg: "transparent" }}
        _focus={{ border: "none" }}
        onClick={() => {
          navigate(-1);
        }}
        {...rest}
      >
        {btnTitle}
      </Button>
    </Flex>
  );
};

export default BackBtn;
