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
import useMedia from "../hooks/useMedia";

const SingleAddress = ({ nextStep, address }) => {
  const { sm } = useMedia();
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);

  return (
    <Box
      border={"1px solid"}
      rounded="md"
      borderColor={"gray.200"}
      px={"1.5rem"}
      py="1.5rem"
      // bg="gray.100"
      // gap={5}
      h="fit-content"
      minW="16rem"
    >
      <Grid fontSize=".85rem" gap={"10px"}>
        <GridItem display="flex" gap={2} alignItems="center">
          <Text fontSize=".9rem" fontWeight="medium">
            {address?.name}
          </Text>
          <Badge colorScheme="purple"> Default </Badge>
        </GridItem>
        <GridItem color="gray.500"> {address?.address}</GridItem>
        <GridItem color="gray.500">
          {address?.city}, {address?.state},{address.country},{address.zipCode}
        </GridItem>
        {/* <GridItem>
            <Text color="gray.400">{address?.phone}</Text>
          </GridItem> */}
      </Grid>
      <Flex mt="3" gap={3}>
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
                colorScheme="blue"
                size="xs"
              >
                Selected address
              </Button>
            ) : (
              <Button
                _focus={{ outline: "none" }}
                variant="outline"
                colorScheme="blue"
                size="xs"
                onClick={() => dispatch(setShippingAddress(address))}
              >
                Select
              </Button>
            )}
          </>
        }
      </Flex>
    </Box>
  );
};

export default SingleAddress;
