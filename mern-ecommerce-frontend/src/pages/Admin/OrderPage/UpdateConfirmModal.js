import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { updateOrderDeliveryStatusAction } from "../../../features/order/orderSlice";

const UpdateConfirmModal = ({
  deliveryStatus,
  orderId,
  setDeliveryStatus,
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch();
  return (
    <Modal
      w="100%"
      isCentered="true"
      isOpen={isOpen}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent w="auto">
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

export default UpdateConfirmModal;
