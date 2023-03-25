import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeProduct } from "../../features/product/productSlice";
import PopMenu from "../PopMenu";

export const ProductCardUI = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Flex
      alignItems={"center"}
      mb="3"
      w="40rem"
      bg="blue.300"
      p="5"
      rounded={"md"}
      borderColor="gray"
      flexDir={"column"}
      justifyContent="space-between"
    >
      {/* TODO image */}
      <VStack>
        <Image
          src={product?.images !== null && product?.images[0]?.img_url}
          alt="pimg"
          borderRadius="md"
          w="100%"
          boxSize="60px"
        />
        <Text>{product?.name}</Text>
      </VStack>
      <Text>{product?.price}</Text>
      <Text>{product?.inventory}</Text>
      <PopMenu
        deleteFunc={() => dispatch(removeProduct(product?._id))}
        editFunc={() => {
          navigate(product._id);
          // dispatch(reset());
        }}
      />
    </Flex>
  );
};
