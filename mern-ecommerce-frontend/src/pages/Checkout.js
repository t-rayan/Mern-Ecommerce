import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackBtn from "../components/BackBtn";
import BillandAddForm from "../components/BillandAddForm";
import DeliveryAddressForm from "../components/DeliveryAddressForm";
import MultiStepForm from "../components/MultiStepForm";
import MyCart from "../components/MyCart";
import OrderSummary from "../components/OrderSummary";
import PaymentForm from "../components/PaymentForm";
import {
  showAddandBillingScreen,
  showCartScreen,
} from "../features/ui/uiSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const { currentDevice, isCartScreen, isAddandBillingScreen } = useSelector(
    (state) => state.ui
  );

  const { cartItems } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(showCartScreen("apple"));
  }, [dispatch]);

  const onClickHandler = () => {
    if (isAddandBillingScreen) {
    }
  };

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
        gap="4rem"
      >
        <BillandAddForm />
        <DeliveryAddressForm />
        <PaymentForm />
      </Grid>
    </Box>
  );
};

export default Checkout;
