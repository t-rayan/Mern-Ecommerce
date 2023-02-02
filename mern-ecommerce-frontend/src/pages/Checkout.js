import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Grid, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackBtn from "../components/BackBtn";
import MultiStepForm from "../components/MultiStepForm";
import MyCart from "../components/MyCart";
import OrderSummary from "../components/OrderSummary";
import {
  showAddandBillingScreen,
  showCartScreen,
} from "../features/ui/uiSlice";
import useMedia from "../hooks/useMedia";

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
    <Box h="100%">
      <Grid gap={10}>
        <Heading>Checkout</Heading>
        <Grid
          templateColumns={
            currentDevice === "large" && cartItems.length > 0
              ? "1fr .5fr"
              : "1fr"
          }
          gap={10}
          h="100%"
          justifyContent="space-between"
        >
          <Box>
            {/* <MyCart /> */}

            {/* multistep form */}
            {<MultiStepForm />}
          </Box>
          <Box>{cartItems?.length > 0 && <OrderSummary />}</Box>
        </Grid>
        {isCartScreen ? (
          <BackBtn btnTitle={"Continue shopping"} />
        ) : (
          <Flex>
            <Button
              p="0px"
              leftIcon={<ArrowBackIcon w="17px" h="17px" />}
              variant="ghost"
              _hover={{ bg: "transparent", color: "gray.400" }}
              _active={{ bg: "transparent" }}
              _focus={{ border: "none" }}
              fontSize=".9rem"
              onClick={() => {
                isAddandBillingScreen
                  ? dispatch(showCartScreen())
                  : dispatch(showAddandBillingScreen());
              }}
            >
              Back
            </Button>
          </Flex>
        )}
      </Grid>
    </Box>
  );
};

export default Checkout;
