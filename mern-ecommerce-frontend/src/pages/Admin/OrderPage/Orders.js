import { useEffect, useState } from "react";
import EmptyState from "../../../components/EmptyState";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Badge,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Grid,
  VStack,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import LoadingState from "../../../components/LoadingState";
import { SearchIcon } from "@chakra-ui/icons";

import {
  fetchAllOrders,
  removeSingleOrder,
  updateOrderDeliveryStatusAction,
} from "../../../features/order/orderSlice";
import {
  convertDate,
  getDayOnly,
  getMonthOnly,
} from "../../../utils/DateModifiers";
import ScrollableLayout from "../../../layouts/ScrollableLayout";
import Pagination from "../../../components/Pagination";
import { FaTrash } from "react-icons/fa";
import { RiDeleteBin4Line } from "react-icons/ri";
import UrlModifier from "../../../utils/_url_modifier";

const Orders = () => {
  const dispatch = useDispatch();

  const [currentOrder, setCurrentOrder] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(1);

  const { isLoading, pagination, orders } = useSelector((state) => state.order);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    UrlModifier({ name: "q", value: e.target.value });
  };

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch, page, searchQuery]);

  return (
    <>
      {/* {deliveryStatus && (
        <UpdateConfirmModal
          deliveryStatus={deliveryStatus}
          orderId={currentOrder}
          setDeliveryStatus={setDeliveryStatus}
        />
      )} */}
      <>
        <Stack spacing="10">
          {/* header */}
          <Flex justifyContent="space-between" alignItems="flex-end">
            <Heading size="lg" color="gray.800">
              Orders
            </Heading>
          </Flex>
          <ScrollableLayout>
            {/* search input */}
            <Box mb={"3rem"}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  type="text"
                  name="q"
                  placeholder="Search"
                  borderColor="gray.300"
                  onChange={handleChange}
                />
              </InputGroup>
            </Box>

            {/* content table */}

            {/* <Table
              variant="simple"
              size="md"
              color="gray.400"
              fontWeight="medium"
              scaleX={"scroll"}
            >
              <Thead fontSize=".8rem">
                <Tr>
                  <Th>
                    <Text>Customer </Text>
                  </Th>
                  <Th>Order Date</Th>
                  <Th>Total Items</Th>
                  <Th>Total Price</Th>
                  <Th>Payment</Th>
                  <Th>Delivery</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody fontSize=".85rem">
                {orders?.map((order) => (
                  <Tr key={order._id}>
                    <Td textAlign={"left"}>
                      <Text>
                        {order?.userId?.firstname}
                      </Text>
                    </Td>
                    <Td textAlign={"left"}>
                      <Text>{convertDate(order.createdAt)}</Text>
                    </Td>
                    <Td textAlign={"left"}>
                      <Text>{order?.products?.length}</Text>
                    </Td>
                    <Td textAlign={"left"}>
                      <Text>{order?.total}</Text>
                    </Td>
                    <Td textAlign={"left"}>
                      <Badge
                        fontSize=".7rem"
                        color={"gray.300"}
                        bg="blackAlpha.800"
                      >
                        {order?.isPaid ? "SUCCEEDED" : "NOT PAID"}
                      </Badge>
                    </Td>
                    <Td textAlign={"left"}>
                      <Select
                        size={"sm"}
                        disabled={order?.isDelivered ? true : false}
                        value={order?.isDelivered ? "DELIVERED" : "PENDING"}
                        color={order?.isDelivered ? "purple.600" : "orange.400"}
                        fontSize=".8rem"
                        fontWeight="bold"
                        onChange={(e) => {
                          setDeliveryStatus(true);
                          setCurrentOrder(order?._id);
                        }}
                      >
                        {["DELIVERED", "PENDING"].map((x, index) => (
                          <option key={index} value={x}>
                            {x}
                          </option>
                        ))}
                      </Select>
                    </Td>
                    <Td textAlign={"center"}>
                      <Icon
                        _hover={{ color: "red.500" }}
                        cursor="pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(removeSingleOrder(order?._id));
                        }}
                        as={RiDeleteBin4Line}
                        fontSize="1.2rem"
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table> */}

            <OrderContainer
              orders={orders}
              setCurrentOrder={setCurrentOrder}
              setDeliveryStatus={setDeliveryStatus}
            />

            <Pagination
              page={page}
              setPage={setPage}
              tPages={pagination?.totalPages}
            />
          </ScrollableLayout>
        </Stack>
      </>
    </>
  );
};

const UpdateConfirmModal = ({
  deliveryStatus,
  orderId,
  setDeliveryStatus,
  isOpen,
  onClose,
}) => {
  console.log(orderId, deliveryStatus);
  const dispatch = useDispatch();
  return (
    <Modal isCentered="true" isOpen={isOpen} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="md">Update Delivery Status</Heading>
        </ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Text color="gray.500">
            Are you sure want to update delivery status ?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            size="md"
            colorScheme="green"
            mr={3}
            onClick={() =>
              dispatch(
                updateOrderDeliveryStatusAction({
                  orderId: orderId,
                  isDelivered: deliveryStatus,
                  modelCloseHandler: onClose,
                })
              )
            }
          >
            Update
          </Button>
          <Button size="md" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const OrderContainer = ({ orders }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deliveryStatus, setDeliveryStatus] = useState(false);
  const [orderId, setOrderId] = useState("");

  const selectValues = [
    { name: "DELIVERED", value: true },
    { name: "PENDING", value: false },
  ];

  const handleSelectChange = (e, data) => {
    const { value } = e.target;
    const { id } = data;
    onOpen();
    setOrderId(id);
    if (value === "PENDING") {
      setDeliveryStatus(false);
    } else {
      setDeliveryStatus(true);
    }
  };

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
            mt="1.3rem"
            borderRadius={"5px"}
            bg="gray.50"
            // h="5rem"
            w={"100%"}
            py={3}
            px={4}
            gap={2}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Grid
              rounded="md"
              placeItems={"center"}
              w="5rem"
              bg="gray.200"
              py="2"
            >
              <VStack>
                <Heading size="sm">{getDayOnly(order.createdAt)}</Heading>
                <Heading size="sm">{getMonthOnly(order.createdAt)} </Heading>
              </VStack>
            </Grid>
            <VStack
              onClick={() => navigate(`${order._id}`)}
              cursor={"pointer"}
              flex={"0.5"}
              alignItems={"start"}
            >
              <Text fontWeight={"bold"} textTransform={"capitalize"}>
                {order.userId.firstname}
              </Text>
              <Text fontSize={".8rem"} mt="0" pt="0" color="gray.500">
                Total of ${order.total}
              </Text>
            </VStack>
            <VStack flex="0.2" alignItems={"start"}>
              <Select
                size={"sm"}
                // disabled={order?.isDelivered ? true : false}
                value={!order?.isDelivered ? "PENDING" : "DELIVERED"}
                color={order?.isDelivered ? "purple.600" : "orange.400"}
                fontSize=".8rem"
                fontWeight="bold"
                onChange={(e) => handleSelectChange(e, { id: order?._id })}
              >
                {selectValues.map((x) => (
                  <option key={x.name} value={x.name}>
                    {x.name}{" "}
                  </option>
                ))}
              </Select>
            </VStack>
            <VStack flex="0.2" alignItems={"start"}>
              <Text fontSize={".9rem"} fontWeight={"semibold"}>
                Payment
              </Text>
              <Badge colorScheme={order.isPaid ? "purple" : "orange"}>
                {" "}
                {order.isPaid ? "Success" : "PENDING"}{" "}
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
              fontSize="1.2rem"
            />
          </Flex>
        );
      })}
    </Box>
  );
};

export default Orders;
