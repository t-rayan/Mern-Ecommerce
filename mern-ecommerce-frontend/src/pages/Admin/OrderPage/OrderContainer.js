import {
  Badge,
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  useDisclosure,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { RiDeleteBin4Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeSingleOrder } from "../../../features/order/orderSlice";
import useMedia from "../../../hooks/useMedia";
import { getDayOnly, getMonthOnly } from "../../../utils/DateModifiers";
import UpdateConfirmModal from "./UpdateConfirmModal";

const OrderContainer = ({ orders }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deliveryStatus, setDeliveryStatus] = useState(false);
  const [orderId, setOrderId] = useState("");
  const { sm } = useMedia();

  return (
    <Box>
      {isOpen && (
        <UpdateConfirmModal
          isOpen={isOpen}
          orderId={orderId}
          onOpen={onOpen}
          onClose={onClose}
          deliveryStatus={deliveryStatus}
        />
      )}
      {orders.map((order) => {
        return (
          <Flex
            key={order._id}
            borderRadius={"5px"}
            bg="gray.50"
            mb="1.2rem"
            // h="5rem"
            py="3"
            w={"100%"}
            px={4}
            gap={2}
            alignItems="center"
            justifyContent={"space-between"}
            flexWrap="wrap"
          >
            <Grid
              rounded="md"
              placeItems={"center"}
              w="auto"
              p={4}
              bg="gray.100"
              py="2"
            >
              <VStack>
                <Heading size={{ base: "xs", lg: "sm" }}>
                  {getDayOnly(order.createdAt)}
                </Heading>
                <Heading size={{ base: "xs", lg: "sm" }}>
                  {getMonthOnly(order.createdAt)}{" "}
                </Heading>
              </VStack>
            </Grid>

            <VStack
              onClick={() => navigate(`${order._id}`)}
              cursor={"pointer"}
              flex={"0.5"}
              alignItems={"start"}
            >
              <Text
                size={{ base: "xs", lg: "sm" }}
                fontWeight={"bold"}
                textTransform={"capitalize"}
              >
                {order.userId.firstname}
              </Text>
              <Text fontSize={".8rem"} mt="0" pt="0" color="gray.500">
                Total of ${order.total}
              </Text>
            </VStack>

            <VStack flex="0.2" alignItems={"start"}>
              <Text fontSize={".9rem"} fontWeight={"semibold"}>
                Payment
              </Text>
              <Badge
                rounded="full"
                size={"xs"}
                fontSize={".7rem"}
                colorScheme={order.isPaid ? "purple" : "orange"}
              >
                {" "}
                {order.isPaid ? "Success" : "Pending"}{" "}
              </Badge>
            </VStack>
            <Icon
              _hover={{ color: "red.500" }}
              cursor="pointer"
              onClick={(e) => {
                e.preventDefault();
                dispatch(removeSingleOrder(order?._id));
              }}
              as={RiDeleteBin4Line}
              fontSize={sm ? "1rem" : "1.2rem"}
            />
          </Flex>
        );
      })}
    </Box>
  );
};
export default OrderContainer;
