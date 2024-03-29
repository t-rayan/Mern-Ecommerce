import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import LoadingState from "../components/LoadingState";
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
      {/* <BackBtn btnTitle="Product Details" /> */}
      <Box
        display="grid"
        gridTemplateColumns="repeat( auto-fit, minmax(350px, 1fr) );"
        gap={"2rem"}
        alignItems="center"
        bg="white"
        p={5}
        rounded="md"
        shadow="sm"
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
        maxW="100%"
        overflowX={"auto"}
        mt={"2rem"}
        bg="white"
        p={10}
        rounded="md"
        shadow={"sm"}
      >
        <Heading size="md">Product Specifications</Heading>
        {/* <Text  mt={1}>{product?.desc}</Text> */}

        <Text mt={5} dangerouslySetInnerHTML={{ __html: product?.desc }} />
      </Box>
    </Box>
  );
};

export default ProductDetails;
