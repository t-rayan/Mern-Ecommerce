import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTotal } from "../features/cart/cartSlice";
import {
  createNewOrderAction,
  updateOrderWithPaymentDetailsAction,
} from "../features/order/orderSlice";
import {
  getPaypalClientID,
  getPaypalClientIDService,
} from "../features/payment/paymentServices";
import { createPayment } from "../features/payment/paymentSlice";
import {
  showAddandBillingScreen,
  showPaymentScreen,
} from "../features/ui/uiSlice";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sdkReady, setSdkReday] = useState(false);
  const [paypalClientId, setPaypalClientId] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const { activeOrder } = useSelector((state) => state.order);
  const { isCartScreen, isAddandBillingScreen, isPaymentScreen } = useSelector(
    (state) => state.ui
  );
  const { cartItems, shippingAddress, shippingCharge, total } = useSelector(
    (state) => state.cart
  );
  const orderData = useSelector((state) => state.cart);

  const { isLoading } = useSelector((state) => state.payment);

  function getSubTotal() {
    let subTotal;
    let items = [...cartItems];

    if (items.length > 0) {
      subTotal = items.map((b) => b.total).reduce((a, b) => a + b);
      return subTotal;
    } else {
      return 0;
    }
  }

  const subTotal = getSubTotal();
  const final = subTotal + shippingCharge;
  const handleCheckout = () => {
    // if not logged in redirect to login screen
    if (userInfo === null) {
      navigate("/login");
    }

    dispatch(showAddandBillingScreen());
  };

  const handleCreateOrder = () => {
    dispatch(showPaymentScreen());
  };

  // useEffect
  useEffect(() => {
    // loading paypal script
    const fetchCLientId = async () => {
      const res = await getPaypalClientIDService(userInfo?.token);
      const paypalClientId = res.data;
      setPaypalClientId(paypalClientId);
      // const script = document.createElement("script");
      // script.type = "text/javascript";
      // script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&locale=en_US`;
      // script.async = true;

      // script.onload = () => {
      //   setSdkReday(true);
      // };
      // document.body.appendChild(script);
    };
    fetchCLientId();

    // setting total
    dispatch(setTotal(final));
  }, [dispatch, final, userInfo?.token]);

  const handlePaypalCreateOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: total,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const handlePaypalOnApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      dispatch(
        createNewOrderAction({
          orderDetails: orderData,
          paymentDetails: details,
          navigateHelper: navigate,
        })
      );
    });
  };

  return (
    <Box display="grid" gap={"1.5rem"}>
      {shippingAddress && isPaymentScreen && (
        <Box p={5} shadow="lg" borderRadius="10px">
          <Flex alignItems="center" justifyContent="space-between">
            <Heading size="sm">Order Summary</Heading>
            <Button leftIcon={<EditIcon />} colorScheme="green" variant="ghost">
              Edit
            </Button>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text>{shippingAddress?.name}</Text>
            <Text>
              {shippingAddress?.address},{shippingAddress?.city},
              {shippingAddress?.state},{shippingAddress?.zipCode},
              {shippingAddress?.country}
            </Text>
            <Text color="gray.500">{shippingAddress?.phone}</Text>
          </Flex>
        </Box>
      )}

      <>
        <Box p={5} shadow="lg" borderRadius="10px">
          <Heading size="sm">Order Summary</Heading>
          <Box mt={10} display="grid" gap={4}>
            <Flex
              color="gray.400"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize=".9rem">Sub Total</Text>
              <Text fontSize=".9rem"> ${subTotal} </Text>
            </Flex>
            <Flex
              color="gray.400"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize=".9rem">Discounts</Text>
              <Text fontSize=".9rem"> 0 </Text>
            </Flex>
            <Flex
              color="gray.400"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize=".9rem">Shipping</Text>
              <Text fontSize=".9rem">
                {" "}
                {shippingCharge === 0 ? "Free" : shippingCharge}{" "}
              </Text>
            </Flex>
          </Box>
          <Divider my={5} />
          <Flex
            color="black"
            justifyContent="space-between"
            alignItems="center"
            fontWeight="medium"
            fontSize="1.1rem"
          >
            <Text fontSize=".9rem">Total</Text>
            <Box>
              <Text fontSize=".9rem" color="red.300">
                {total}
                {/* {cartItems.length > 0 && getCartSubtotal()}{" "} */}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box alignSelf="center" width="100%">
          {isCartScreen && (
            <Button
              disabled={isLoading}
              colorScheme="green"
              size="lg"
              onClick={handleCheckout}
            >
              {isLoading ? "Please Wait..." : "Checkout"}
            </Button>
          )}
          {shippingAddress && isAddandBillingScreen && (
            <Button colorScheme="green" size="lg" onClick={handleCreateOrder}>
              Payment
            </Button>
          )}
          {isPaymentScreen && (
            <PayPalScriptProvider options={{ "client-id": paypalClientId }}>
              <PayPalButtons
                createOrder={handlePaypalCreateOrder}
                onApprove={handlePaypalOnApprove}
              />
            </PayPalScriptProvider>
            // <Button
            //   colorScheme="green"
            //   size="lg"
            //   onClick={handleOrderPaymentUpdate}
            // >
            //   Complete Order
            // </Button>
          )}
        </Box>
      </>
    </Box>
  );
};

export default OrderSummary;
