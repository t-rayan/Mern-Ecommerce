import { Box, Button, Heading, HStack } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { setPaymentMode, setShippingAddress } from "../features/cart/cartSlice";

// loading stripe outside of component function

const PaymentForm = () => {
  const dispatch = useDispatch();

  const { shippingType, paymentMode, shippingAddress } = useSelector(
    (state) => state.cart
  );

  const handlePaymentType = (e) => {
    dispatch(setPaymentMode(e.target.value));
  };

  return (
    <Box bg="white" rounded="md" shadow={"sm"} p={5}>
      {/* main contents */}
      <Heading mb="1.5rem" fontSize={"1.1rem"} fontWeight={"semibold"}>
        3. Payment Options
      </Heading>
      <HStack spacing="5">
        {["COD", "PAYPAL"].map((name) => (
          <Button
            isDisabled={shippingType && shippingAddress ? false : true}
            key={name}
            textTransform="uppercase"
            value={name}
            w="6rem"
            h="3rem"
            rounded={"md"}
            onClick={handlePaymentType}
            // border={paymentMode === name && "2px solid"}
            color={paymentMode === name ? "blue.500" : "gray.500"}
            bg={paymentMode === name ? "blue.100" : "gray.200"}
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
