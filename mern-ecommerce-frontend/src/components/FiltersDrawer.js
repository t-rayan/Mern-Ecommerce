import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiDeleteBin4Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../features/brand/brandSlice";
import { getAllCategories } from "../features/category/categorySlice";
import {
  getAllProducts,
  setBrandFilters,
  setCategoryFilters,
} from "../features/product/productSlice";
import PriceSlider from "./PriceSlider";

const FiltersDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [isFilter, setIsFilter] = useState(false);
  const { categories } = useSelector((state) => state.categories);
  const { brands } = useSelector((state) => state.brand);

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [brandFilter, setBrandFilter] = useState("");
  const [filterPrice, setFilterPrice] = useState({
    minPrice: 500,
    maxPrice: 2000,
  });

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
    setIsFilter(true);
    // console.log(filterValue);
  };
  const handleBrandFilterChange = (val) => {
    setBrandFilter(val);
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
    onClose();
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
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={"firstField"}
        onClose={onClose}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader px="1.8rem" borderBottomWidth="1px">
            Filters
          </DrawerHeader>

          <DrawerBody px="1.8rem" py={5} display="grid">
            {/* catergory filter */}
            <VStack alignItems="start" spacing="5">
              <Heading size="md">Category</Heading>
              <CheckboxGroup
                colorScheme="green"
                defaultValue={["naruto", "kakashi"]}
              >
                <Stack spacing={[5]} direction={["column"]}>
                  <RadioGroup
                    colorScheme="green"
                    defaultValue={"All"}
                    onClick={handleCategoryFilterChange}
                  >
                    <Stack direction="column">
                      <Radio value="All">All</Radio>

                      {categories?.map((name, index) => (
                        <Radio key={index} value={name}>
                          {name}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </Stack>
              </CheckboxGroup>
            </VStack>
            {/* brand filter */}
            <VStack alignItems="start" spacing="5">
              <Heading size="md">Brands</Heading>
              <CheckboxGroup
                onChange={handleBrandFilterChange}
                colorScheme="green"
              >
                <Stack spacing={[5]} direction={["column"]}>
                  {brands?.map((cat) => (
                    <Checkbox key={cat._id} value={cat._id}>
                      {cat.name}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </VStack>
            <PriceSlider
              isFilter={isFilter}
              setIsFilter={setIsFilter}
              filterPrice={filterPrice}
              setFilterPrice={setFilterPrice}
            />
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button
              size="lg"
              w="100%"
              variant="outline"
              mr={3}
              onClick={handleResetFilters}
              leftIcon={<RiDeleteBin4Line w={5} h={5} />}
            >
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FiltersDrawer;
