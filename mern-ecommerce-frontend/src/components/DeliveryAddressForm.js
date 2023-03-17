import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setShippingCharge, setShippingType } from "../features/cart/cartSlice";

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const { shippingCharge, shippingType, shippingAddress } = useSelector(
    (state) => state.cart
  );

  const deliveryOptions = [
    {
      id: "1",
      value: 0,
      option: "Free",
      type: "Free",
      deliveredOn: "Delivered on Monday, August 12",
    },
    {
      id: "2",
      value: 5,
      option: "Fast($2)",
      type: "Fast",
      deliveredOn: "Delivered on Monday, August 1",
    },
  ];
  const [deliveryType, setDeliveryType] = useState(deliveryOptions[0].type);

  const handleDeliveryType = (e) => {
    const { name, value } = e.target;
    dispatch(setShippingType({ name, value }));
    // dispatch(setShippingCharge(value));
  };

  return (
    <Box>
      <Heading fontSize={"1.1rem"} fontWeight={"normal"} mb="1.5rem">
        2. Delivery Options
      </Heading>
      {/* delivery options */}
      <HStack spacing={"5"} border={"1px solid #ddd"} p={"2rem"} rounded="xl">
        {deliveryOptions?.map((del) => (
          <Button
            disabled={shippingAddress ? false : true}
            key={del.id}
            w="8rem"
            h="3.8rem"
            rounded={"xl"}
            name={del.type}
            value={del.value}
            onClick={handleDeliveryType}
            border={shippingType === del.type && "2px solid"}
            borderColor={shippingType === del.type && "green.400"}
            // bg={shippingType === del.type && "transparent"}
          >
            {del.option}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

export default DeliveryAddressForm;
