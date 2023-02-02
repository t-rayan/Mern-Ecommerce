import { ArrowLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  ModalFooter,
  Grid,
  Heading,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import orderSuccessImg from "../images/order_success.svg";

const CheckoutSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Modal size="full" isOpen={true} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={5}>
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            placeItems="center"
            textAlign="center"
            gap={10}
          >
            <Heading>Thanks for your purchase.</Heading>
            <Image src={orderSuccessImg} width="300px" />
            <Text>Thanks for placing order</Text>
            <Text color="green.500"> {orderId}</Text>
            <Text>
              We will send you a notification within 5 days when it ships.{" "}
              <br /> If you have any question or queries then fell to get in
              contact us.
            </Text>
            <Flex
              gap={5}
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
              width="100%"
            >
              <Button
                size={"lg"}
                leftIcon={<FaArrowLeft />}
                variant="outline"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </Button>
              <Button size={"lg"} colorScheme="green">
                Download as pdf
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckoutSuccess;
