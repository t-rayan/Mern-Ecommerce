import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  HStack,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
  Tooltip,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProductsByCategoryAction } from "../features/product/productSlice";
import UrlModifier from "../utils/_url_modifier";

const PriceSlider = ({
  isFilter,
  filterPrice,
  setFilterPrice,
  // setFilterGroup,
}) => {
  const dispatch = useDispatch();

  const [price, setPrice] = useState({
    minPrice: 100,
    maxPrice: 2000,
  });

  const { name } = useParams();
  const catNameFromUrl = name;

  const [showTooltip, setShowTooltip] = useState(false);

  const handleOnChange = (val) => {
    UrlModifier({ name: "minPrice", value: val[0] });
    UrlModifier({ name: "maxPrice", value: val[1] });

    setPrice({
      ...price,
      minPrice: val[0],
      maxPrice: val[1],
    });
    dispatch(getAllProductsByCategoryAction(catNameFromUrl));
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        bg="gray.100"
        fontSize=".9rem"
        fontWeight="normal"
        border="1px solid"
        borderColor="inherit"
        _active={{ bg: "none" }}
        _focus={{ boxShadow: "none" }}
        _hover={{ bg: "gray.200" }}
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
                  type="text"
                  name="minPrice"
                  borderRadius="5px"
                  size={"sm"}
                  // onChange={handlePriceChange}
                  value={price.minPrice}
                />
              </HStack>
              <HStack>
                <Text color="gray.400" fontSize=".8rem">
                  Min ($)
                </Text>
                <Input
                  type="number"
                  name="maxPrice"
                  size={"sm"}
                  borderRadius="5px"
                  value={price.maxPrice}
                  // onChange={handlePriceChange}
                />
              </HStack>
            </Flex>

            {/* main Slider */}
            <RangeSlider
              size={"lg"}
              min={0}
              max={4000}
              defaultValue={[100, 2000]}
              colorScheme="blue"
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
                label={price?.minPrice ? `$${price?.minPrice}` : "$10"}
              >
                <RangeSliderThumb index={0} />
              </Tooltip>
              <Tooltip
                hasArrow
                bg="black"
                color="white"
                placement="top"
                isOpen={showTooltip}
                label={price?.maxPrice ? `$${price?.maxPrice}` : "$2000"}
              >
                <RangeSliderThumb index={1} />
              </Tooltip>
            </RangeSlider>
          </VStack>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default PriceSlider;
