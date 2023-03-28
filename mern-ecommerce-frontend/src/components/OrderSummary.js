import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTotal } from "../features/cart/cartSlice";
import { createNewOrderAction } from "../features/order/orderSlice";
import { getPaypalClientIDService } from "../features/payment/paymentServices";

const OrderSummary = ({ pageTitles }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paypalClientId, setPaypalClientId] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const { isPaymentScreen } = useSelector((state) => state.ui);
  const { cartItems, shippingAddress, shippingCharge, total, paymentMode } =
    useSelector((state) => state.cart);
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
    } else {
      navigate("checkout");
    }

    // dispatch(showAddandBillingScreen());
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
    <Box
      display="grid"
      p="5"
      rounded="md"
      shadow="sm"
      gap={"1.5rem"}
      bg="white"
    >
      {shippingAddress && isPaymentScreen && (
        <Box p={5}>
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
        <Heading size="sm">Order Summary</Heading>

        <Box py={"1.7rem"} borderRadius="5px">
          <Box display="grid" gap={4}>
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
          {pageTitles.length === 1 && (
            <Button
              disabled={isLoading}
              bg="black"
              size="lg"
              h="3.5rem"
              color={"white"}
              onClick={handleCheckout}
              w="100%"
              _hover={{ bg: "blackAlpha.900" }}
            >
              {isLoading ? "Please Wait..." : "Checkout"}
            </Button>
          )}

          {paymentMode !== "PAYPAL" && pageTitles.length > 1 && (
            <Button
              disabled={isLoading}
              bg="black"
              size="lg"
              h="3.5rem"
              color={"white"}
              onClick={handleCheckout}
              w="100%"
              _hover={{ bg: "blackAlpha.900" }}
            >
              {isLoading ? "Please Wait..." : "Payment"}
            </Button>
          )}

          {paymentMode === "PAYPAL" && pageTitles.length > 1 && (
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
