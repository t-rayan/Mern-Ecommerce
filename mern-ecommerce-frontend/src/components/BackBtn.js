import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const BackBtn = ({ btnTitle }) => {
  const navigate = useNavigate();
  return (
    <Flex>
      <Button
        p="0px"
        leftIcon={<ArrowBackIcon w="17px" h="17px" />}
        variant="ghost"
        _hover={{ bg: "transparent", color: "gray.400" }}
        _active={{ bg: "transparent" }}
        _focus={{ border: "none" }}
        fontSize=".9rem"
        onClick={() => {
          navigate(-1);
        }}
      >
        {btnTitle}
      </Button>
    </Flex>
  );
};

export default BackBtn;
