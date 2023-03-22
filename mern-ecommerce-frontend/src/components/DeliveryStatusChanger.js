import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleOrder,
  updateOrderDeliveryStatusAction,
} from "../features/order/orderSlice";

function DeliveryStatusChanger() {
  const [orderId, setOrderId] = useState("");
  const { order } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [deliveryStatus, setDeliveryStatus] = useState(false);

  const { onOpen, isOpen, onClose } = useDisclosure();

  const handleSelectChange = (e, data) => {
    const { value } = e.target;
    const { id } = data;
    setOrderId(id);

    onOpen();
    // dispatch(setOrderId(id))
    if (value === "PENDING") {
      setDeliveryStatus(false);
    } else {
      setDeliveryStatus(true);
    }
  };

  return (
    <>
      {isOpen && (
        <UpdateConfirmModal
          isOpen={isOpen}
          orderId={orderId}
          onOpen={onOpen}
          onClose={onClose}
          deliveryStatus={deliveryStatus}
        />
      )}
      <Select
        size={"sm"}
        w="10rem"
        // disabled={order?.isDelivered ? true : false}
        value={!order?.isDelivered ? "PENDING" : "DELIVERED"}
        color={order?.isDelivered ? "purple.600" : "orange.400"}
        fontSize=".8rem"
        fontWeight="bold"
        onChange={(e) => handleSelectChange(e, { id: order?._id })}
      >
        {["DELIVERED", "PENDING"].map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ))}
      </Select>
    </>
  );
}

const UpdateConfirmModal = ({
  deliveryStatus,
  orderId,
  setDeliveryStatus,
  isOpen,
  onClose,
}) => {
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

export default DeliveryStatusChanger;
