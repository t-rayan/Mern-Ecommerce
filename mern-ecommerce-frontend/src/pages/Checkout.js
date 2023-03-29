import { Box, Grid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BillandAddForm from "../components/BillandAddForm";
import DeliveryAddressForm from "../components/DeliveryAddressForm";
import PaymentForm from "../components/PaymentForm";
import { showCartScreen } from "../features/ui/uiSlice";

const Checkout = () => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(showCartScreen("apple"));
  }, [dispatch]);

  return (
    <Box
      h="100%"
      // bg="blue.400"
      placeItems={cartItems?.length === 0 && "center"}
    >
      <Grid
        pos="relative"
        // zIndex={"999999"}
        // mt={"2rem"}
        templateColumns={"1fr"}
        gridTemplateRows="1fr"
        h="100%"
        gap="2rem"
      >
        <BillandAddForm />
        <DeliveryAddressForm />
        <PaymentForm />
      </Grid>
    </Box>
  );
};

export default Checkout;
