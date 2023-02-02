import { Box, Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../features/product/productSlice";

const Searchbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Box display="flex" gap={2}>
      <Input
        size="lg"
        borderRadius="md"
        border="1.8px solid"
        borderColor="gray.400"
        _focus={{ border: "2px solid", borderColor: "green.300" }}
        type="text"
        placeholder="Search producsts ...."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* <Button
        size="lg"
        colorScheme="green"
        // disabled={searchQuery ? false : true}
        onClick={() =>
          navigate({
            pathname: "products/search/",
            search: `?query=${searchQuery}`,
          })
        }
      >
        Search
      </Button> */}
    </Box>
  );
};

export default Searchbar;
