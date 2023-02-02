import React from "react";
import { Box, Select, Text } from "@chakra-ui/react";
import Searchbar from "./Searchbar";
import { useDispatch, useSelector } from "react-redux";
import { sortProducts } from "../features/product/productSlice";

const UtilityBar = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  return (
    <Box
      display="grid"
      gridTemplateColumns={["1fr", "1fr", "20rem auto", "30rem auto"]}
      alignItems="center"
      justifyContent="space-between"
      gap={5}
    >
      <Searchbar />
      <Box
        display="grid"
        gridTemplateColumns="1fr auto"
        alignItems="center"
        justifyContent="space-between"
        gap={3}
      >
        <Text fontWeight="semibold">Sort By</Text>
        <Select placeholder="Select">
          <option
            value="lowtohigh"
            onClick={() =>
              dispatch(
                sortProducts({ filterType: "lowtohigh", products: products })
              )
            }
          >
            Low - High
          </option>
          <option
            value="hightolow"
            onClick={() =>
              dispatch(
                sortProducts({ filterType: "hightolow", products: products })
              )
            }
          >
            Hight - Low{" "}
          </option>
        </Select>
      </Box>
    </Box>
  );
};

export default UtilityBar;
