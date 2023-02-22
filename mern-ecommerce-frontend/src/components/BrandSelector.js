import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Select,
  Box,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import AppInput from "./AppInput";
import { addBrand, resetBrandMsg } from "../features/brand/brandSlice";
import Alertbox from "./Alertbox";

const BrandSelector = ({ handleChange, value }) => {
  const dispatch = useDispatch();
  const [brandName, setBrandName] = useState();

  const { brands, message } = useSelector((state) => state.brand);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddBrand = () => {
    dispatch(addBrand({ brandInfo: { name: brandName }, onClose: onClose }));
  };
  const handleBrandChange = (e) => {
    setBrandName(e.target.value);
    message && dispatch(resetBrandMsg());
  };

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="product-cat"> Brand </FormLabel>
        <HStack>
          <Select
            name="brand"
            borderColor="gray.300"
            placeholder="Select Brand"
            fontSize=".9rem"
            size="lg"
            onChange={handleChange}
            value={value}
          >
            {brands?.map((brand) => (
              <option key={brand?._id} value={brand?._id}>
                {brand?.name}
              </option>
            ))}
          </Select>
          <Button onClick={onOpen}>Add</Button>
        </HStack>
      </FormControl>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Brand</ModalHeader>
          <ModalCloseButton color="red" />
          <ModalBody>
            <AppInput
              label="Brand Name"
              name="brandName"
              placeholder="Brand Name"
              onChange={handleBrandChange}
            />
            <Box mt="3">
              {message && <Alertbox msg={message} closeFunc={resetBrandMsg} />}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddBrand}>
              Add
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BrandSelector;
