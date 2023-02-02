import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAddress } from "../features/auth/authSlice";
import { setShippingAddress } from "../features/cart/cartSlice";
import { showPaymentScreen } from "../features/ui/uiSlice";

const SingleAddress = ({ nextStep, address }) => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);

  return (
    <>
      <Flex
        shadow="lg"
        borderRadius="10px"
        p={"1.8rem"}
        justifyContent="space-between"
        wrap={"wrap"}
        gap={5}
      >
        <Grid fontSize=".85rem" gap={"10px"}>
          <GridItem display="flex" gap={2} alignItems="center">
            <Text fontSize=".9rem" fontWeight="medium">
              {address?.name}
            </Text>
            <Badge colorScheme="purple"> Default </Badge>
          </GridItem>
          <GridItem> {address?.address}</GridItem>
          <GridItem>
            {address?.city}, {address?.state},{address.country},
            {address.zipCode}
          </GridItem>
          <GridItem>
            <Text color="gray.400">{address?.phone}</Text>
          </GridItem>
        </Grid>
        <Flex gap={3}>
          {shippingAddress?._id !== address?._id && (
            <Button
              _focus={{ outline: "none" }}
              variant="outline"
              size="xs"
              onClick={() =>
                dispatch(
                  updateUserAddress({
                    addressDetails: { addressId: address?._id },
                  })
                )
              }
            >
              Delete
            </Button>
          )}
          {
            <>
              {shippingAddress?._id === address?._id ? (
                <Button
                  _focus={{ outline: "none" }}
                  variant="solid"
                  colorScheme="green"
                  size="xs"
                >
                  Selected address
                </Button>
              ) : (
                <Button
                  _focus={{ outline: "none" }}
                  variant="outline"
                  colorScheme="green"
                  size="xs"
                  onClick={() => dispatch(setShippingAddress(address))}
                >
                  Deliver To This Address
                </Button>
              )}
            </>
          }
        </Flex>
      </Flex>
    </>
  );
};

export default SingleAddress;
