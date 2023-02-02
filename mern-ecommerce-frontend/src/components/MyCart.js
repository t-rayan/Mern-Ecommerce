import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Img,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAll } from "../features/cart/cartSlice";
import { showAddandBillingScreen } from "../features/ui/uiSlice";
import CartItem from "./CartItem";
import emptyCartImg from "../images/empty-cart.svg";

const MyCart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { currentDevice } = useSelector((state) => state.ui);

  return (
    <>
      {cartItems.length > 0 ? (
        <Box borderRadius="10px" w="100%">
          <Flex gap={2} justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
              <Heading size="sm">Cart </Heading>{" "}
              <Text>({cartItems?.length} items)</Text>{" "}
            </Box>
            {cartItems?.length > 0 && (
              <Button
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={() => dispatch(removeAll())}
              >
                Clear all
              </Button>
            )}
          </Flex>
          {/* cart table */}
          <Grid mt={4} gap={5}>
            {/* <Grid
            bg="gray.200"
            p=".9rem"
            borderRadius="10px"
            templateColumns={
              currentDevice === "mobile"
                ? "8rem auto auto auto auto "
                : "1fr 5.5rem 8rem 5.5rem .1fr"
            }
            color="gray.500"
            fontWeight="medium"
            fontSize=".9rem"
          >
            <GridItem>Product</GridItem>
            <GridItem>Price</GridItem>
            <GridItem>Quantity</GridItem>
            <GridItem>Total </GridItem>
            <GridItem></GridItem>
          </Grid> */}

            {/* list of cart items */}
            {cartItems?.length > 0 && (
              <Box>
                {cartItems?.map((i) => (
                  <CartItem key={i.id} product={i} />
                ))}
              </Box>
            )}
          </Grid>
        </Box>
      ) : (
        <Box
          display="grid"
          w="100%"
          placeItems="center"
          gap={20}
          p={10}
          bg="gray.50"
          borderRadius="10px"
        >
          <Heading size="sm" color="gray.400">
            Cart is empty
          </Heading>
          <Image w="300px" src={emptyCartImg} />
        </Box>
      )}
    </>
  );
};

export default MyCart;
