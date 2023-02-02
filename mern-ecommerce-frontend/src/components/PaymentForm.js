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

// loading stripe outside of component function

const PaymentForm = () => {
  const dispatch = useDispatch();

  const { shippingCharge } = useSelector((state) => state.cart);

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

  return (
    <Box display="grid" gap={5}>
      {/* main contents */}
      <Box shadow="lg" p="1.5rem" borderRadius="10px">
        <Heading size="md">Delivery Options</Heading>
        {/* delivery options */}
        <Grid
          mt={"2rem"}
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          gridTemplateColumns="1fr 1fr"
          gap={5}
        >
          {deliveryOptions.map((opt) => (
            <Flex
              gap={3}
              px={2}
              py={"1rem"}
              borderRadius={"10px"}
              border="1px solid"
              borderColor="gray.200"
              alignItems="center"
              cursor="pointer"
              onClick={() =>
                handleDeliveryType({
                  shippingFee: opt.value,
                  deliveryType: opt.type,
                })
              }
              key={opt.id}
              width="100%"
              wrap="wrap"
            >
              <Icon
                color={shippingCharge === opt.value ? "green.500" : "gray.500"}
                as={
                  shippingCharge === opt.value
                    ? RiCheckboxCircleFill
                    : RiCheckboxBlankCircleLine
                }
                h={5}
                w={5}
              />
              <Box>
                <Text fontSize=".9rem" fontWeight="medium">
                  {opt.option}
                </Text>
                <Text color="gray.400" fontSize=".75rem">
                  {opt.deliveredOn}
                </Text>
              </Box>
            </Flex>
          ))}
        </Grid>
      </Box>
      <Box shadow="xl" p="1.5rem" borderRadius="10px">
        <Heading mb={"2rem"} size="md">
          Payment Options
        </Heading>

        <RadioGroup defaultValue={paymentType}>
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
        </RadioGroup>
      </Box>

      {/* footer */}
    </Box>
  );
};

export default PaymentForm;
