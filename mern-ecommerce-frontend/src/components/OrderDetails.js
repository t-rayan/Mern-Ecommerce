import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { HiOutlineCalendar } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleOrder } from "../features/order/orderSlice";
import useMedia from "../hooks/useMedia";
import { getFullDate, getTime } from "../utils/DateModifiers";
import BackBtn from "./BackBtn";
import DeliveryStatusChanger from "./DeliveryStatusChanger";
import LoadingState from "./LoadingState";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { products } = order;
  const { isMobile } = useMedia();

  const { order, isLoading } = useSelector((state) => state.order);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleOrder(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (order)
    return (
      <Box px={{ xl: 10, sm: "5" }} py="5">
        <BackBtn btnTitle={"Order Details"} />

        {/* toolbar */}
        <Flex flexDirection="column">
          <Heading mt={"1.5rem"} textTransform="capitalize">
            {order?.userId?.firstname}
          </Heading>
          <HStack fontSize={".9rem"} mt="3" color="gray.500">
            <Text>Placed on</Text>
            <Icon as={HiOutlineCalendar} fontSize="1.3rem" />
            <Text> {getFullDate(order.createdAt)}</Text>
            <Text> {getTime(order.createdAt)}</Text>
          </HStack>
        </Flex>

        {/* basic info */}
        <Card mt={"1.5rem"}>
          <CardHeader>
            <Heading size="md">Basic Info</Heading>
          </CardHeader>
          <Divider borderColor={"gray.300"} />

          <CardBody px="0">
            <Stack divider={<Divider />} spacing="4">
              {/* customer name and address */}
              <Flex wrap={"wrap"} px="5" w="100%" alignItems="start" gap={3}>
                <Heading flex={"1 1 20%"} size="xs" textTransform="uppercase">
                  Customer
                </Heading>
                <VStack flex={"1 1 80%"} alignItems="start">
                  <Text
                    fontWeight={"bold"}
                    fontSize="sm"
                    textTransform="capitalize"
                  >
                    {order?.shippingDetails?.name}
                  </Text>
                  <Text
                    color="gray.500"
                    textTransform="capitalize"
                    fontSize=".9rem"
                  >
                    {order?.shippingDetails?.address}
                  </Text>
                  <Text
                    color="gray.500"
                    textTransform="capitalize"
                    fontSize=".9rem"
                  >
                    {order?.shippingDetails?.city}
                  </Text>
                  <Text
                    color="gray.500"
                    textTransform="capitalize"
                    fontSize=".9rem"
                  >
                    {order?.shippingDetails?.phone}
                  </Text>
                </VStack>
              </Flex>

              {/* order ID */}
              <Flex wrap={"wrap"} px="5">
                <Heading flex={"1 1 20%"} size="xs" textTransform="uppercase">
                  ID
                </Heading>
                <Text flex={"1 1 80%"} fontSize="sm">
                  {order?._id}
                </Text>
              </Flex>

              {/* date */}
              <Flex wrap={"wrap"} px="5" alignItems={"start"}>
                <Heading flex={"1 1 20%"} size="xs" textTransform="uppercase">
                  Date
                </Heading>
                <Text color="gray.500" flex={"1 1 80%"} fontSize="sm">
                  {getFullDate(order.createdAt)}
                </Text>
              </Flex>

              {/* total */}
              <Flex wrap={"wrap"} px="5" alignItems={"start"}>
                <Heading flex={"1 1 20%"} size="xs" textTransform="uppercase">
                  Total
                </Heading>
                <Text color="gray.500" flex={"1 1 80%"} fontSize="sm">
                  ${order.total}
                </Text>
              </Flex>

              {/* Payment Status */}
              <Flex rowGap={".7rem"} wrap={"wrap"} px="5" alignItems={"center"}>
                <Heading flex={"1 1 20%"} size="xs" textTransform="uppercase">
                  Payment
                </Heading>
                <Box color="gray.500" flex={"1 1 80%"} fontSize="sm">
                  <Badge colorScheme={order.isPaid ? "purple" : "orange"}>
                    {order.isPaid ? "Success" : "Pending"}
                  </Badge>
                </Box>
              </Flex>

              {/* Delivery Status */}
              <Flex rowGap={".7rem"} wrap={"wrap"} px="5" alignItems={"center"}>
                <Heading flex={"1 1 20%"} size="xs" textTransform="uppercase">
                  Delivery
                </Heading>
                <Box color="gray.500" flex={"1 1 80%"} fontSize="sm">
                  <DeliveryStatusChanger />
                </Box>
              </Flex>
            </Stack>
          </CardBody>
        </Card>

        {/* items info */}
        <Card mt={"2.8rem"}>
          <CardHeader>
            <Heading size="md">Order Items</Heading>
          </CardHeader>
          <Divider borderColor={"gray.300"} />

          <CardBody px="0">
            {/* product details */}
            <Flex wrap={"wrap"} px="5" w="100%" py="5" alignItems="center">
              <Heading flex={"1 1 55%"} size="xs">
                Product
              </Heading>
              <Text
                flex={"1 1 15%"}
                fontWeight={"bold"}
                fontSize="sm"
                textTransform="capitalize"
              >
                Price
              </Text>
              <Text
                flex={"1 1 15%"}
                textTransform="capitalize"
                fontSize=".9rem"
                fontWeight={"bold"}
              >
                Qty
              </Text>
              <Text
                flex={"1 1 15%"}
                textTransform="capitalize"
                fontSize=".9rem"
                fontWeight={"bold"}
              >
                Total
              </Text>
            </Flex>

            {/* single product details */}

            {order.products?.map((product) => (
              <Flex wrap={"wrap"} px="5" w="100%" py="5" alignItems="center">
                <Flex
                  gap={3}
                  alignItems={"center"}
                  wrap="wrap"
                  flex={"1 1 55%"}
                >
                  {/* <Box bg="gray.200" p={2} rounded="md">
                    <Image src={product.thumbnail} h="30px" w="30px" />
                  </Box> */}
                  <Text fontSize=".8rem">{product.name}</Text>
                </Flex>

                <Text color={"gray.500"} fontSize=".8rem" flex={"1 1 15%"}>
                  ${product.price}
                </Text>
                <Text fontSize=".8rem" flex={"1 1 15%"} color="gray.500">
                  {product.qty}
                </Text>
                <Text flex={"1 1 15%"} color="gray.500" fontSize=".8rem">
                  ${product.price * product.qty}
                </Text>
              </Flex>
            ))}
          </CardBody>
        </Card>

        {/* total */}
        <Card mt="5">
          <CardHeader>
            <Flex justifyContent={"space-between"}>
              <Heading size="md">Total</Heading>
              <Heading size="md">${order.total}</Heading>
            </Flex>
          </CardHeader>
        </Card>
      </Box>
    );
};

export default OrderDetails;
