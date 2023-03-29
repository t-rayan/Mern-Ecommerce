import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUserAddress } from "../features/auth/authSlice";
import { showPaymentScreen } from "../features/ui/uiSlice";
import AppInput from "./AppInput";
import SingleAddress from "./SingleAddress";

const BillandAddForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userInfo, currentUser } = useSelector((state) => state.auth);

  // local state

  const [addressDetails, setAddressDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: " ",
    zipCode: "",
    country: "",
  });

  const dispatch = useDispatch();

  // handling input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddressDetails({
      ...addressDetails,
      [name]: value,
    });
  };

  // handle address update
  const handleAddressUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUserAddress({ addressDetails, onClose }));
    setAddressDetails({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: " ",
      zipCode: "",
      country: "",
    });
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(getUser());
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Box h="100%" p={5} rounded="md" bg="white" shadow="sm">
        {/* list of address */}
        <Flex justifyContent={"space-between"}>
          <Heading fontSize={"1.1rem"} fontWeight={"semibold"}>
            1. Billing Information
          </Heading>
          <Button
            leftIcon={<AddIcon w="13px" h="13px" />}
            bg="blue.200"
            size="sm"
            color="blue.600"
            _hover={{ bg: "blue.300", color: "blue.600" }}
            _active={{ bg: "transparent" }}
            _focus={{ border: "none" }}
            fontSize=".9rem"
            onClick={onOpen}
          >
            Add new address
          </Button>
        </Flex>

        <Box
          // border={"1px solid #ddd"}
          display={"flex"}
          gap={"2rem"}
          py={5}
          overflowX={"scroll"}
        >
          {currentUser?.addressDetails.length > 0 &&
            currentUser?.addressDetails.map((address) => (
              <SingleAddress
                key={address._id}
                address={address}
                nextStep={() => dispatch(showPaymentScreen())}
              />
            ))}
        </Box>

        {/* footer */}
      </Box>

      {/* modal */}
      <Modal isOpen={isOpen} size="md" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid height="320px">
              <Flex gap={2}>
                <AppInput
                  size="lg"
                  onChange={handleChange}
                  placeholder="Full name"
                  name="name"
                />
                <AppInput
                  size="lg"
                  onChange={handleChange}
                  placeholder="Phone number"
                  type="number"
                  name="phone"
                />
              </Flex>
              <AppInput
                size="lg"
                onChange={handleChange}
                placeholder="Address"
                name="address"
              />
              <Flex gap="3">
                <AppInput
                  size="lg"
                  onChange={handleChange}
                  placeholder="Town/City"
                  name="city"
                />
                <AppInput
                  size="lg"
                  onChange={handleChange}
                  placeholder="State"
                  name="state"
                />
                <AppInput
                  size="lg"
                  onChange={handleChange}
                  placeholder="Zip Code"
                  name="zipCode"
                />
              </Flex>
              <AppInput
                size="lg"
                onChange={handleChange}
                placeholder="Country"
                name="country"
              />
            </Grid>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={handleAddressUpdate}
              >
                Add Address
              </Button>

              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BillandAddForm;
