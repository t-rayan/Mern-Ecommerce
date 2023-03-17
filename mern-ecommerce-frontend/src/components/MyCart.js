import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAll } from "../features/cart/cartSlice";
import CartItem from "./CartItem";

const MyCart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
      <Box borderRadius="10px" w="100%">
        <Flex gap={2} justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Heading size="sm">Cart </Heading>{" "}
            <Text>({cartItems?.length} items)</Text>{" "}
          </Box>
          {cartItems?.length > 0 && (
            <Button
              size="sm"
              variant="solid"
              colorScheme="red"
              onClick={() => dispatch(removeAll())}
            >
              Clear all
            </Button>
          )}
        </Flex>
        {/* cart table */}
        <Grid h="38rem" overflowY={"scroll"} pr={"2rem"}>
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
    </>
  );
};

export default MyCart;
