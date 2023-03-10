import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiAddFill, RiArrowLeftSLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getUser, reset, updateUserAddress } from "../features/auth/authSlice";
import { resetShippingAddress } from "../features/cart/cartSlice";
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
    // return () => {
    //   dispatch(resetShippingAddress());
    // };
  }, [dispatch, userInfo]);

  return (
    <>
      <Box h="100%" display="grid" gap={"1.5rem"}>
        {/* list of address */}

        {currentUser?.addressDetails.length > 0 &&
          currentUser?.addressDetails.map((address) => (
            <SingleAddress
              key={address._id}
              address={address}
              nextStep={() => dispatch(showPaymentScreen())}
            />
          ))}
        {/* footer */}
        <Flex justifyContent="end" alignItems="center">
          <Button
            leftIcon={<AddIcon w="13px" h="13px" />}
            bg="green.200"
            size="sm"
            color="green"
            _hover={{ bg: "green.300", color: "green" }}
            _active={{ bg: "transparent" }}
            _focus={{ border: "none" }}
            fontSize=".9rem"
            onClick={onOpen}
          >
            Add new address
          </Button>
        </Flex>
      </Box>

      {/* modal */}
      <Modal isOpen={isOpen} size="lg" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid height="340px" gap={5}>
              <Flex gap={3}>
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
            <Flex gap={3}>
              <Button
                variant="solid"
                colorScheme="green"
                onClick={handleAddressUpdate}
              >
                Add Address
              </Button>

              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BillandAddForm;
