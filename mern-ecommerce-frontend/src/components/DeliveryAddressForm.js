import { Box, Button, Heading, HStack } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { setShippingType } from "../features/cart/cartSlice";

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const { shippingType, shippingAddress } = useSelector((state) => state.cart);

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

  const handleDeliveryType = (e) => {
    const { name, value } = e.target;
    dispatch(setShippingType({ name, value }));
    // dispatch(setShippingCharge(value));
  };

  return (
    <Box bg="white" rounded="md" shadow="sm" p="5">
      <Heading fontSize={"1.1rem"} fontWeight={"normal"} mb="1.5rem">
        2. Delivery Options
      </Heading>
      {/* delivery options */}
      <HStack spacing={"5"}>
        {deliveryOptions?.map((del) => (
          <Button
            isDisabled={shippingAddress === null ? true : false}
            key={del.id}
            shadow="sm"
            // colorScheme={shippingType === del.type ? "green" : "gray"}
            w="6rem"
            p={2}
            h="3rem"
            rounded={"md"}
            name={del.type}
            value={del.value}
            color={shippingType === del.type ? "blue.600" : "gray.500"}
            bg={shippingType === del.type ? "blue.100" : "gray.200"}
            onClick={handleDeliveryType}
            // border={shippingType === del.type && "2px solid"}
            // borderColor={shippingType === del.type && "blue.400"}
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
