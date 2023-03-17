import { Box, Flex, Grid, Heading, Icon, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetSingleOrder } from "../features/order/orderSlice";
import useMedia from "../hooks/useMedia";
import UserOrder from "./UserOrder";

const OrderDetails = ({ order }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = order;
  const { isMobile } = useMedia();

  return (
    <Box
      borderRadius="10px"
      p={isMobile ? "1rem" : "2rem"}
      fontSize=".8rem"
      shadow="lg"
    >
      <Box>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="md">Order Details</Heading>
          <Icon
            color="gray.500"
            cursor="pointer"
            _hover={{ color: "red.400" }}
            as={RiCloseCircleLine}
            h={6}
            w={6}
            onClick={() => {
              dispatch(resetSingleOrder());
              navigate(-1);
            }}
          />
        </Flex>
        {order && <UserOrder isCustom={true} currentOrder={order} />}
        {/* items */}
        <Box display="grid" borderRadius="10px" gap={5} shadow="sm" p={"2rem"}>
          <Heading size>Items</Heading>
          <Box display="grid" gap={5}>
            {products?.map((product) => (
              <Box
                display="flex"
                gap={2}
                key={product.id}
                justifyContent="space-between"
                alignItems="center"
              >
                <Flex gap={3} flexDir={["column", "row"]}>
                  <Image src={product.thumbnail} h="40px" w="40px" />
                  <Box>
                    <Text fontSize=".9rem">{product.name}</Text>
                    <Text fontSize=".9rem" color="gray.400">
                      {product.size}, {product.color}
                    </Text>
                  </Box>
                </Flex>

                <Text fontSize=".9rem">{product.qty}</Text>
                <Text fontSize=".9rem">{product.price}</Text>
              </Box>
            ))}
          </Box>
        </Box>

        {/* shipping  */}
        {/* <Box display="grid" borderRadius="10px" gap={5} shadow="sm" p={"2rem"}>
          <Heading size>Shipping Details</Heading>
          <Box display="grid" gap={5}>
            <Grid>
              <Text fontSize=".9rem" fontWeight="semibold">
                Name
              </Text>
              <Text color="gray.500">{shipping.name}</Text>
            </Grid>
            <Grid>
              <Text fontSize=".9rem" fontWeight="semibold">
                Address
              </Text>
              <Text color="gray.500">
                {shipping.address.line1},{shipping.address.city},{" "}
                {shipping.address.state},{""}
                {shipping.address.country}
              </Text>
            </Grid>
            <Grid>
              <Text fontSize=".9rem" fontWeight="semibold">
                Shipping Fee
              </Text>
              <Text color="gray.500">Free</Text>
            </Grid>
          </Box>
        </Box> */}

        {/* total  */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderRadius="10px"
          gap={5}
          shadow="sm"
          p={"2rem"}
        >
          <Heading size={["sm", "md"]}>Total</Heading>
          <Heading color="gray.500" size={["sm", "md"]}>
            {order.total}
          </Heading>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderDetails;
