import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingState from "../components/LoadingState";
import OrderDetails from "../components/OrderDetails";
import UserOrder from "../components/UserOrder";
import { fetchUserOrders, resetOrder } from "../features/order/orderSlice";

const User = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const { orders, order, isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchUserOrders(userInfo?.id));
    return () => {
      dispatch(resetOrder());
    };
  }, [dispatch, userInfo?.id]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <Box display="grid" gridTemplateColumns={"1fr"} gap={10} alignItems="start">
      <Box display="grid" gap={10}>
        <Box borderRadius="10px">
          <Heading color="green.400" size="md">
            Hello
          </Heading>
          <Heading size="md" my={2} textTransform="capitalize">
            {userInfo?.fullname}
          </Heading>
          <Text color="gray.500">{userInfo?.id}</Text>
        </Box>
        {!order && (
          <Box>
            <Heading mb="2rem" size="md">
              Your Orders
            </Heading>

            <Grid
              gridTemplateColumns="repeat( auto-fill, minmax(350px, 1fr) );"
              gap="2rem"
            >
              {orders?.map((order) => (
                <UserOrder key={order._id} currentOrder={order} />
              ))}
            </Grid>
          </Box>
        )}
      </Box>
      {order && <OrderDetails order={order} />}
    </Box>
  );
};

export default User;
