import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import {
  searchProducts,
  setSearchFilters,
} from "../features/product/productSlice";
import useMedia from "../hooks/useMedia";

const Searchbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const { sm } = useMedia();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setSearchFilters(searchQuery));
    navigate({
      pathname: "/products/search",
      search: `?q=${searchQuery}`,
    });
  };

  return (
    <form onSubmit={submitHandler} display="flex" gap={2}>
      <InputGroup size={sm ? "md" : "lg"} bg="gray.100" rounded="lg">
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.500" />}
        />
        <Input
          size={sm ? "md" : "lg"}
          rounded="lg"
          // borderRadius="md"
          value={searchQuery}
          borderColor="inherit"
          _focus={{ border: "2px solid", borderColor: "inherit" }}
          type="text"
          placeholder="Search producsts ...."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>
    </form>
  );
};

export default Searchbar;
