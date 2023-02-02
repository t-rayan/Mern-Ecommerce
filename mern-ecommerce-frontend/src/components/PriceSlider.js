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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPriceFilters } from "../features/product/productSlice";

const PriceSlider = ({
  isFilter,
  setIsFilter,
  filterPrice,
  setFilterPrice,
}) => {
  const dispatch = useDispatch();
  // const [filterPrice, setFilterPrice] = useState({
  //   minPrice: 500,
  //   maxPrice: 2000,
  // });

  const [showTooltip, setShowTooltip] = useState(false);

  const handleOnChange = (val) => {
    setIsFilter(true);
    setFilterPrice({
      ...filterPrice,
      minPrice: val[0],
      maxPrice: val[1],
    });
  };

  useEffect(() => {
    isFilter && dispatch(setPriceFilters(filterPrice));
  }, [dispatch, filterPrice, isFilter]);

  return (
    <VStack spacing={5} alignItems={"start"}>
      <Heading size="md">Price</Heading>
      <Flex gap={5}>
        <HStack>
          <Text color="gray.400" fontSize=".8rem">
            Min ($)
          </Text>
          <Input
            type="number"
            borderRadius="5px"
            size={"sm"}
            value={filterPrice.minPrice}
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
            value={filterPrice.maxPrice}
          />
        </HStack>
      </Flex>

      {/* main Slider */}
      <RangeSlider
        size={"lg"}
        min={0}
        max={3000}
        defaultValue={[10, 500]}
        colorScheme="green"
        onChange={handleOnChange}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {[0, 500, 1000, 1500, 2000, 2500, 3000].map((item) => (
          <RangeSliderMark
            key={item}
            value={item}
            mt="3"
            ml="-3"
            fontSize=".8rem"
          >
            {item}
          </RangeSliderMark>
        ))}

        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>

        <Tooltip
          hasArrow
          bg="black"
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={`$${filterPrice.minPrice}`}
        >
          <RangeSliderThumb index={0} />
        </Tooltip>
        <Tooltip
          hasArrow
          bg="black"
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={`$${filterPrice.maxPrice}`}
        >
          <RangeSliderThumb index={1} />
        </Tooltip>
      </RangeSlider>
    </VStack>
  );
};

export default PriceSlider;
