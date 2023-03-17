import {
  Box,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { getAllBrands } from "../features/brand/brandSlice";
import { getAllCategories } from "../features/category/categorySlice";
import {
  getAllProducts,
  resetFilter,
  setBrandFilters,
  setFilterGroup,
} from "../features/product/productSlice";
import BrandFilter from "./BrandFilter";
import PriceSlider from "./PriceSlider";
import SortFilter from "./SortFilter";

const FilterPanel = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllBrands());
    dispatch(resetFilter());
  }, [dispatch]);

  return (
    <>
      <Box
        h="auto"
        py={6}
        display="flex"
        gap={"2rem"}
        justifyContent="space-between"
      >
        {/* catergory filter */}
        <Box>
          <HStack alignItems="start" spacing="5">
            <BrandFilter />
            <Box>
              <PriceSlider />
            </Box>
          </HStack>
        </Box>
        <SortFilter />
      </Box>
    </>
  );
};

export default FilterPanel;
