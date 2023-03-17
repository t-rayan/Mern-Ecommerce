import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
  Radio,
  RadioGroup,
  Stack,
  HStack,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  RiArrowLeftSLine,
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentMode, setShippingCharge } from "../features/cart/cartSlice";
import DeliveryAddressForm from "./DeliveryAddressForm";

// loading stripe outside of component function

const PaymentForm = () => {
  const dispatch = useDispatch();

  const { shippingAddress, shippingType, paymentMode } = useSelector(
    (state) => state.cart
  );

  const deliveryOptions = [
    {
      id: "1",
      value: 0,
      option: "Standard (Free)",
      type: "Standard",
      deliveredOn: "Delivered on Monday, August 12",
    },
    {
      id: "2",
      value: 5,
      option: "Fast ($2)",
      type: "Fast",
      deliveredOn: "Delivered on Monday, August 1",
    },
  ];

  const paymentOptions = [
    {
      id: "1",
      value: "Paypal",
      option: "Paypal",
      text: "Delivered on Monday, August 12",
    },
    {
      id: "2",
      value: "Cash",
      option: "Cash on Delivery",
      text: "Delivered on Monday, August 12",
    },
  ];
  const [deliveryType, setDeliveryType] = useState(deliveryOptions[0].type);

  const [paymentType, setPaymentType] = useState(paymentOptions[0].value);

  const handleDeliveryType = (value) => {
    if (deliveryType === value) {
      return;
    } else {
      dispatch(setShippingCharge(value));
    }
  };

  const handlePaymentType = (e) => {
    dispatch(setPaymentMode(e.target.value));
  };

  return (
    <Box>
      {/* main contents */}
      <Heading mb="1.5rem" fontSize={"1.1rem"} fontWeight={"normal"}>
        3. Payment Options
      </Heading>
      <HStack spacing="5" border={"1px solid #ddd"} p={"2rem"} rounded="xl">
        {/* <RadioGroup defaultValue={paymentType}>
          <Stack spacing={5} direction="column">
            {paymentOptions.map((opt) => (
              <Box
                key={opt.id}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="10"
                p="5"
              >
                <Radio
                  colorScheme="green"
                  value={opt.value}
                  onChange={() => dispatch(setPaymentMode(opt.value))}
                  size="lg"
                  spacing="5"
                >
                  <Flex gap={1} flexDir="column">
                    <Text> {opt.option}</Text>
                    <Text fontSize=".9rem" color="gray.400">
                      {" "}
                      {opt.text}
                    </Text>
                  </Flex>
                </Radio>
              </Box>
            ))}
          </Stack>
        </RadioGroup> */}

        {["COD", "PAYPAL"].map((name) => (
          <Button
            disabled={shippingType ? false : true}
            key={name}
            value={name}
            w="8rem"
            h="3.8rem"
            rounded={"xl"}
            onClick={handlePaymentType}
            border={paymentMode === name && "2px solid"}
            borderColor={paymentMode === name && "green.400"}
            // bg={paymentMode === name && "transparent"}
          >
            {name}
          </Button>
        ))}
      </HStack>

      {/* footer */}
    </Box>
  );
};

export default PaymentForm;
