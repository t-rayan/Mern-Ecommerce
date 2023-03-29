import React from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { convertDate } from "../utils/DateModifiers";
import { useNavigate } from "react-router-dom";

const UserOrder = ({ currentOrder, isCustom }) => {
  const { order } = useSelector((state) => state.order);
  const navigate = useNavigate();
  return (
    <Box
      display="grid"
      gridTemplateColumns={"1fr"}
      // shadow={currentOrder?._id === order?._id && !isCustom && "lg"}
      fontSize={[".8rem", ".9rem"]}
      p={["1rem"]}
      // border="1px solid"
      bg="white"
      borderColor="gray.300"
      rounded="md"
      shadow="sm"
      gap={5}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box
        borderRadius="10px"
        gap={5}
        justifyContent="space-between"
        alignItems="center"
        alignContent="center"
      >
        <Flex justifyContent={"space-between"}>
          <Box display="flex" gap={2} flexDir="column">
            <Text fontWeight="medium">Order Date: </Text>
            <Text color="gray.500">{convertDate(currentOrder?.createdAt)}</Text>
          </Box>
          <Box>
            {/* <Text fontWeight="medium">Payment Status: </Text> */}
            <Badge colorScheme="green">
              {currentOrder?.isPaid ? "Paid" : "Unpaid"}{" "}
            </Badge>
          </Box>
        </Flex>

        <Box mt={2} display="flex" gap={2} alignItems="start" flexDir="column">
          <Text fontWeight="medium">Delivery Status: </Text>
          <Badge colorScheme={currentOrder?.isDelivered ? "purple" : "orange"}>
            {currentOrder?.isDelivered ? "Delivered" : "Pending"}
          </Badge>
        </Box>
      </Box>
      <Grid h="100%">
        <GridItem alignSelf="end">
          {" "}
          {!isCustom && (
            <Button
              variant="outline"
              size="xs"
              colorScheme="blue"
              onClick={() => {
                navigate(`orders/${currentOrder._id}`);
              }}
            >
              View
            </Button>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default UserOrder;
