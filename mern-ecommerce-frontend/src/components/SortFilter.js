import { Box, Select } from "@chakra-ui/react";
import React from "react";

const SortFilter = () => {
  return (
    <Box>
      <Select
        placeholder="Sort By"
        fontSize=".9rem"
        _focus={{ boxShadow: "none", borderColor: "none" }}
      >
        <option value="option3">A - Z</option>
        <option value="option3">Z - A</option>
        <option value="option1">Price:High - Low</option>
        <option value="option2">Price:Low - Hight</option>
      </Select>
    </Box>
  );
};

export default SortFilter;
