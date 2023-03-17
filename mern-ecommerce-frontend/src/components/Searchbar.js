import { SearchIcon } from "@chakra-ui/icons";
import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useMedia from "../hooks/useMedia";

const Searchbar = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const { sm } = useMedia();

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchQuery)
      navigate({
        pathname: "/products/search",
        search: `?q=${searchQuery}`,
      });
  };

  return (
    <form onSubmit={submitHandler} display="flex" gap={2}>
      <InputGroup size={sm ? "md" : "md"} bg="gray.100" rounded="lg">
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.400" />}
        />
        <Input
          size={sm ? "md" : "md"}
          rounded="lg"
          // borderRadius="md"
          value={searchQuery}
          color="gray.500"
          borderColor="inherit"
          _focus={{ border: "2px solid", borderColor: "inherit" }}
          type="text"
          placeholder="Search producsts, brands, categories"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          {searchQuery && (
            <Icon
              cursor={"pointer"}
              w="5"
              h="5"
              as={RiCloseCircleLine}
              color="gray.400"
              _hover={{ color: "gray.500" }}
              onClick={() => setSearchQuery("")}
            />
          )}
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default Searchbar;
