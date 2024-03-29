import { Box, Heading, Text, Image, Icon, IconButton } from "@chakra-ui/react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import useMedia from "../hooks/useMedia";

const SingleProduct = ({ product }) => {
  const dispatch = useDispatch();
  const { sm } = useMedia();
  const { thumbnail, _id, name, price, size, color, category, qty, images } =
    product;
  const cartItem = {
    id: _id,
    name: name,
    price: price,
    size: size,
    color: color,
    qty: qty,
    thumbnail: thumbnail?.img_url ? thumbnail?.img_url : images[0]?.img_url,
  };

  const navigate = useNavigate();

  return (
    <Box
      display="grid"
      gap="30px"
      // border="2px"
      padding="2rem 2rem"
      rounded="md"
      cursor="pointer"
      shadow="sm"
      border="1px solid #eee"
      bg="white"
      // mx={sm && "2rem"}

      // border="1px solid #ddd"
    >
      {/* TODO: this is todo */}

      <Box display="grid" placeItems="center">
        <Image
          boxSize="100px"
          src={thumbnail?.img_url ? thumbnail.img_url : images[0]?.img_url}
        />
      </Box>

      <Box onClick={() => navigate(`/products/${_id}`)}>
        <Heading fontSize="1.1rem" mb={1} fontWeight="medium" size="md">
          {category?.name}
        </Heading>
        <Text fontWeight="normal"> {`${name}  ${size}gb  (${color}) `}</Text>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Text
          bg="yellow.200"
          rounded="lg"
          p={2}
          color="gray.900"
          fontWeight="semibold"
        >
          ${price}
        </Text>
        <IconButton
          colorScheme="blue"
          size="sm"
          shadow="lg"
          icon={
            <Icon
              as={RiShoppingCart2Line}
              h={5}
              w={5}
              color="white"
              cursor="pointer"
              onClick={() => dispatch(addToCart(cartItem))}
            />
          }
        />
      </Box>
    </Box>
  );
};

export default SingleProduct;
