import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Icon,
  Stack,
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
            _focus={{ outline: "none" }}
            onClick={() => editFunc()}
          >
            Edit
          </Button>
          <Button
            fontWeight="normal"
            colorScheme="red"
            fontSize=".8rem"
            variant="ghost"
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
