import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FaEllipsisH } from "react-icons/fa";

const PopMenu = ({ deleteFunc, editFunc }) => {
  return (
    <Popover placement="left" bg="#ccc">
      <PopoverTrigger>
        <Button variant="ghost" _focus={{ outline: "none" }}>
          <Icon as={FaEllipsisH} />
        </Button>
      </PopoverTrigger>
      <PopoverContent w="7rem">
        <PopoverBody>
          <Button
            fontWeight="normal"
            fontSize=".8rem"
            variant="ghost"
            colorScheme={"blue"}
            w="100%"
            _focus={{ outline: "none" }}
            onClick={() => editFunc()}
            display="flex"
            justifyContent={"start"}
          >
            Edit
          </Button>
          <Button
            w="100%"
            fontWeight="normal"
            colorScheme="red"
            fontSize=".8rem"
            variant="ghost"
            display="flex"
            justifyContent={"start"}
            _focus={{ outline: "none" }}
            onClick={() => deleteFunc()}
          >
            Delete
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PopMenu;
