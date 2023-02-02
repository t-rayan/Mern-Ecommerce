import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import ImageSlider from "../components/ImageSlider";
import LoadingState from "../components/LoadingState";
import QtyController from "../components/QtyController";
import { addToCart } from "../features/cart/cartSlice";
import { getProduct, reset } from "../features/product/productSlice";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.products);
  const { productId } = useParams();

  useEffect(() => {
    dispatch(getProduct(productId));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, productId]);

  const cartItem = {
    id: product?._id,
    name: product?.name,
    price: product?.price,
    size: product?.size,
    color: product?.color,
    qty: product?.qty,
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <Box>
      <BackBtn btnTitle="Product Details" />
      <Box
        display="grid"
        gridTemplateColumns="repeat( auto-fit, minmax(350px, 1fr) );"
        gap={"2rem"}
        mt={"3rem"}
        alignItems="center"
      >
        <Box>
          <ImageSlider
            imgArray={product?.images}
            thumbnail={product?.thumbnail}
          />
        </Box>
        <Box pr="5rem">
          <Heading mb={2} color="red.500" size="md">
            {product?.inventory <= 0 ? "Out of stock" : ""}
          </Heading>
          <Text>{product?.category?.name}</Text>
          <Heading>{product?.name}</Heading>
          <Box mt="2rem" display="flex" flexDir="column" gap={2}>
            <Heading size="sm">Color:</Heading>
            <Box
              display="grid"
              placeItems="center"
              w="5rem"
              py={2}
              border="1px"
              borderRadius="5px"
              borderColor="gray.300"
            >
              {" "}
              {product?.color}
            </Box>
          </Box>
          <Box mt="2rem" display="flex" flexDir="column" gap={2}>
            <Heading size="sm">Internal Storage:</Heading>
            <Box
              display="grid"
              placeItems="center"
              w="5rem"
              py={2}
              border="1px"
              borderRadius="5px"
              borderColor="gray.300"
            >
              {" "}
              {product?.size}GB
            </Box>
          </Box>
          {/* <Box mt="2rem" display="flex" flexDir="column" gap={4}>
            <Heading size="sm">Quantity:</Heading>
            <QtyController id={product?._id} qty={product?.qty} />

            <Text color="gray.500"> Available: {product?.inventory}</Text>
          </Box> */}
          <Box
            mt="2rem"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Heading size="sm">Price:</Heading>
              <Heading mt={1} size="md">
                ${product?.price}
              </Heading>
            </Box>
            <Button
              size="sm"
              colorScheme="orange"
              onClick={() => dispatch(addToCart(cartItem))}
              disabled={product?.inventory < 1 ? true : false}
            >
              Add To Cart
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        mt={"4rem"}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="10px"
        p={5}
        minH="200px"
      >
        <Heading textDecor="underline" size="lg">
          Description
        </Heading>
        <Text mt={1}>{product?.desc}</Text>
      </Box>
    </Box>
  );
};

export default ProductDetails;
