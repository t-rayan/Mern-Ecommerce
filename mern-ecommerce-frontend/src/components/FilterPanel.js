import {
  Box,
  Heading,
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
import { getAllProducts } from "../features/product/productSlice";
import PriceSlider from "./PriceSlider";

const FilterPanel = () => {
  const dispatch = useDispatch();
  const [isFilter, setIsFilter] = useState(false);
  const { categories } = useSelector((state) => state.categories);
  const { brands } = useSelector((state) => state.brand);

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [brandFilter, setBrandFilter] = useState("All");
  const [filterPrice, setFilterPrice] = useState({
    minPrice: 500,
    maxPrice: 2000,
  });

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
    setIsFilter(true);
    // console.log(filterValue);
  };
  const handleBrandFilterChange = (e) => {
    setBrandFilter(e.target.value);
    setIsFilter(true);
  };

  const handleResetFilters = (e) => {
    e.preventDefault();
    setIsFilter(false);
    setBrandFilter("");
    setCategoryFilter("");
    setFilterPrice({
      minPrice: 500,
      maxPrice: 2000,
    });
    dispatch(getAllProducts());
  };

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllBrands());
    if (isFilter) {
      // dispatch(setCategoryFilters(categoryFilter));
      // dispatch(setBrandFilters(brandFilter));
      dispatch(getAllProducts({ categoryFilter, brandFilter, filterPrice }));
    }
  }, [dispatch, categoryFilter, brandFilter, isFilter, filterPrice]);
  return (
    <>
      <Heading size="md" py={5} px={8} borderBottom="1px solid #ddd">
        Filters
      </Heading>
      <Box h="auto" px={8} py={6} display="grid" gap={"2rem"}>
        {/* catergory filter */}
        <VStack alignItems="start" spacing="5">
          <Heading size="sm">Brands</Heading>
          <Stack spacing={[5]} direction={["column"]}>
            <RadioGroup colorScheme="green" defaultValue={"All"}>
              <Stack direction="column">
                <Radio value="All" onChange={handleBrandFilterChange}>
                  <Text fontSize={".85rem"}>{"All"}</Text>
                </Radio>

                {brands?.map((brand) => (
                  <Radio
                    fontSize=".6rem"
                    key={brand._id}
                    value={brand.name}
                    onChange={handleBrandFilterChange}
                  >
                    <Text fontSize={".85rem"}>{brand.name}</Text>
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </Stack>
        </VStack>
        {/* brand filter */}
        {/* <VStack alignItems="start" spacing="5">
          <Heading size="sm">Brands</Heading>
          <CheckboxGroup
            defaultValue={brandFilter}
            onChange={handleBrandFilterChange}
            colorScheme="green"
          >
            <Stack spacing={[5]} direction={["column"]}>
              <Checkbox value={"All"}>
                <Text fontSize={".85rem"}> {"All"}</Text>
              </Checkbox>
              {brands?.map((brand) => (
                <Checkbox key={brand._id} value={brand.name}>
                  <Text fontSize={".85rem"}> {brand.name}</Text>
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </VStack> */}
        <Box>
          <PriceSlider
            isFilter={isFilter}
            setIsFilter={setIsFilter}
            filterPrice={filterPrice}
            setFilterPrice={setFilterPrice}
          />
        </Box>
      </Box>
    </>
  );
};

export default FilterPanel;
