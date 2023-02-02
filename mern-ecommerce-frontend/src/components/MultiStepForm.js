import { Box, Icon, Text } from "@chakra-ui/react";
import React from "react";
import {
  RiCheckboxBlankCircleFill,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { useSelector } from "react-redux";
import BillandAddForm from "./BillandAddForm";
import MyCart from "./MyCart";
import PaymentForm from "./PaymentForm";

const MultiStepForm = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const {
    isCartScreen,
    isAddandBillingScreen,
    isPaymentScreen,
    isCartComplete,
    isBillComplete,
    isPaymentComplete,
  } = useSelector((state) => state.ui);

  // steps
  const steps = [
    {
      name: "Cart",
      isCompleted: isCartComplete,
      isScreen: isCartScreen,
    },
    {
      name: "Shipping",
      isCompleted: isBillComplete,
      isScreen: isAddandBillingScreen,
    },
    {
      name: "Payment",
      isCompleted: isPaymentComplete,
      isScreen: isPaymentScreen,
    },
  ];

  return (
    <Box display="grid" h="100%" gridTemplateRows=".5fr auto">
      {/* form controllers ui */}

      {cartItems?.length > 0 && (
        <Box
          display="grid"
          gridTemplateColumns="auto auto auto"
          h="100px"
          alignItems="center"
          justifyContent="space-between"
        >
          {steps.map((step) => (
            <Box
              display="flex"
              flexDir="row"
              alignItems="center"
              justifyContent="center"
              gap={1}
              key={step.name}
            >
              <Icon
                as={
                  step.isCompleted
                    ? RiCheckboxCircleFill
                    : RiCheckboxBlankCircleFill
                }
                h={6}
                w={6}
                color={
                  step.isScreen || step.isCompleted ? "green.400" : "gray.400"
                }
              />

              <Text
                fontSize=".9rem"
                fontWeight="medium"
                color={isCartScreen || isCartComplete ? "black" : "gray.400"}
              >
                {step.name}
              </Text>
            </Box>
          ))}
        </Box>
      )}

      {/* main forms */}

      {isCartScreen && <MyCart />}
      {isAddandBillingScreen && <BillandAddForm />}
      {isPaymentScreen && <PaymentForm />}
      {}
    </Box>
  );
};

export default MultiStepForm;
