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
  const [isFilter, setIsFilter] = useState(false);
  const { categories } = useSelector((state) => state.categories);
  const { brands } = useSelector((state) => state.brand);
  const { filterGroup } = useSelector((state) => state.products);
  const { brandFilter } = filterGroup;

  const [filterPrice, setFilterPrice] = useState({
    minPrice: 500,
    maxPrice: 2000,
  });

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllBrands());
    dispatch(resetFilter());
  }, [dispatch]);

  // useEffect(() => {
  //   if (filterGroup !== null) {
  //     dispatch(getAllProducts(filterGroup));
  //   }
  //   // return () => setFilterGroup(null);
  // }, [dispatch, filterGroup]);
  return (
    <>
      {/* <Heading size="md" py={5} px={8} borderBottom="1px solid #ddd">
        Filters
      </Heading> */}
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
              <PriceSlider
                isFilter={isFilter}
                setIsFilter={setIsFilter}
                filterPrice={filterPrice}
                setFilterPrice={setFilterPrice}
                setFilterGroup={setFilterGroup}
                // filterGroup={filterGroup}
              />
            </Box>
          </HStack>
        </Box>
        <SortFilter />
      </Box>
    </>
  );
};

export default FilterPanel;
