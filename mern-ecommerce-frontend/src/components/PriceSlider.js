import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  HStack,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderMark,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
  Tooltip,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  setPriceFilters,
} from "../features/product/productSlice";

const PriceSlider = ({
  isFilter,
  filterPrice,
  setFilterPrice,
  // setFilterGroup,
}) => {
  const dispatch = useDispatch();
  const { filterGroup } = useSelector((state) => state.products);
  const { priceFilter } = filterGroup;

  const [showTooltip, setShowTooltip] = useState(false);

  const handleOnChange = (val) => {
    dispatch(
      setPriceFilters({ priceFilter: { minPrice: val[0], maxPrice: val[1] } })
    );
  };

  useEffect(() => {
    priceFilter && dispatch(getAllProducts(filterGroup));
  }, [dispatch, priceFilter]);

  return (
    <>
      <Menu closeOnSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          bg="none"
          fontSize=".9rem"
          fontWeight="normal"
          border="1px solid"
          borderColor="inherit"
          _active={{ bg: "none" }}
          _focus={{ boxShadow: "none" }}
          _hover={{ bg: "none" }}
        >
          Price
        </MenuButton>
        <MenuList>
          <MenuItem
            w="20rem"
            _active={{ bg: "white" }}
            _focus={{ bg: "white" }}
            // p={5}
          >
            <VStack spacing={5} alignItems={"start"}>
              <Heading size="sm">Price</Heading>
              <Flex gap={5}>
                <HStack>
                  <Text color="gray.400" fontSize=".8rem">
                    Min ($)
                  </Text>
                  <Input
                    type="number"
                    borderRadius="5px"
                    size={"sm"}
                    // value={filterPrice.minPrice}
                  />
                </HStack>
                <HStack>
                  <Text color="gray.400" fontSize=".8rem">
                    Min ($)
                  </Text>
                  <Input
                    type="number"
                    size={"sm"}
                    borderRadius="5px"
                    // value={filterPrice.maxPrice}
                  />
                </HStack>
              </Flex>

              {/* main Slider */}
              <RangeSlider
                size={"lg"}
                min={0}
                max={4000}
                defaultValue={[10, 2000]}
                colorScheme="green"
                onChange={handleOnChange}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>

                <Tooltip
                  hasArrow
                  bg="black"
                  color="white"
                  placement="top"
                  isOpen={showTooltip}
                  label={
                    priceFilter?.minPrice ? `$${priceFilter?.minPrice}` : "$10"
                  }
                >
                  <RangeSliderThumb index={0} />
                </Tooltip>
                <Tooltip
                  hasArrow
                  bg="black"
                  color="white"
                  placement="top"
                  isOpen={showTooltip}
                  label={
                    priceFilter.maxPrice ? `$${priceFilter?.maxPrice}` : "$2000"
                  }
                >
                  <RangeSliderThumb index={1} />
                </Tooltip>
              </RangeSlider>
            </VStack>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default PriceSlider;
