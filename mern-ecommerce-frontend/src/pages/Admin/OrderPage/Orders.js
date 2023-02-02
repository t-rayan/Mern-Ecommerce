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
  Image,
  Text,
  Badge,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  removeProduct,
  reset,
} from "../../../features/product/productSlice";
import LoadingState from "../../../components/LoadingState";
import { RiAddFill } from "react-icons/ri";
import { SearchIcon } from "@chakra-ui/icons";
import PopMenu from "../../../components/PopMenu";
import useMedia from "../../../hooks/useMedia";
import {
  deleteOrderService,
  getAllOrders,
} from "../../../features/order/orderServices";
import {
  fetchAllOrders,
  removeSingleOrder,
  updateOrderDeliveryStatusAction,
} from "../../../features/order/orderSlice";
import authServices from "../../../features/auth/authServices";
import { convertDate } from "../../../utils/DateModifiers";
import ScrollableLayout from "../../../layouts/ScrollableLayout";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentOrder, setCurrentOrder] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState(false);

  const { isLoading, orders } = useSelector((state) => state.order);

  const confirmModal = () => <h1>modal</h1>;

  useEffect(() => {
    dispatch(fetchAllOrders(navigate));
  }, [dispatch, navigate]);

  return (
    <>
      {deliveryStatus && (
        <UpdateConfirmModal
          deliveryStatus={deliveryStatus}
          orderId={currentOrder}
          setDeliveryStatus={setDeliveryStatus}
        />
      )}
      <>
        {isLoading ? (
          <LoadingState />
        ) : orders?.length === 0 ? (
          <EmptyState title="Products" goto={() => navigate("add")} />
        ) : (
          <Stack spacing="10">
            {/* header */}
            <Flex justifyContent="space-between" alignItems="flex-end">
              <Heading size="md" color="gray.800">
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
                    placeholder="Search"
                    borderColor="gray.300"
                  />
                </InputGroup>
              </Box>

              {/* content table */}
              <Table
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
                    <Th>Options</Th>
                  </Tr>
                </Thead>
                <Tbody fontSize=".85rem">
                  {orders?.map((order) => (
                    <>
                      <Tr key={order._id}>
                        <Td textAlign={"left"}>
                          <Text>
                            {order?.userId?.firstname}
                            {/* {order?.userId?._id} */}
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
                            colorScheme={order?.isPaid ? "green" : "red"}
                          >
                            {order?.isPaid ? "SUCCEEDED" : "NOT PAID"}
                          </Badge>
                        </Td>
                        <Td textAlign={"left"}>
                          <Select
                            size={"sm"}
                            disabled={order?.isDelivered ? true : false}
                            value={order?.isDelivered ? "DELIVERED" : "PENDING"}
                            color={order?.isDelivered ? "green" : "orange.400"}
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
                        <Td textAlign={"left"}>
                          <Button
                            size="xs"
                            colorScheme="red"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(removeSingleOrder(order?._id));
                            }}
                          >
                            {" "}
                            Delete{" "}
                          </Button>
                        </Td>
                      </Tr>
                    </>
                  ))}
                </Tbody>
              </Table>
            </ScrollableLayout>
          </Stack>
        )}
      </>
    </>
  );
};

const UpdateConfirmModal = ({ deliveryStatus, orderId, setDeliveryStatus }) => {
  const dispatch = useDispatch();
  return (
    <Modal
      isCentered="true"
      isOpen={true}
      onClose={() => setDeliveryStatus(false)}
      closeOnOverlayClick={false}
    >
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
                  modelCloseHandler: setDeliveryStatus,
                })
              )
            }
          >
            Update
          </Button>
          <Button
            size="md"
            variant="outline"
            onClick={() => setDeliveryStatus(false)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Orders;
