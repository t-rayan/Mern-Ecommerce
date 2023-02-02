import { Box, Heading, Text, Image, Icon } from "@chakra-ui/react";
import { RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const SingleProduct = ({ product }) => {
  const dispatch = useDispatch();
  const { itemQty } = useSelector((state) => state.cart);
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
      padding="1.5rem 1.5rem"
      borderRadius="8px"
      borderColor="gray.300"
      cursor="pointer"
      shadow="sm"
      border="1px solid #eee"
    >
      {/* TODO: this is todo */}
      <Box onClick={() => navigate(`/products/${_id}`)}>
        <Heading fontSize="1.1rem" mb={1} fontWeight="medium" size="md">
          {category?.name}
        </Heading>
        <Text fontWeight="normal"> {`${name}  ${size}gb  (${color}) `}</Text>
      </Box>
      <Box display="grid" placeItems="center">
        <Image
          boxSize="120px"
          src={thumbnail?.img_url ? thumbnail.img_url : images[0]?.img_url}
        />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Text fontWeight="semibold">${price}</Text>
        <Icon
          as={RiShoppingCart2Line}
          h={6}
          w={6}
          color="green.400"
          cursor="pointer"
          _hover={{ color: "orange.500" }}
          onClick={() => dispatch(addToCart(cartItem))}
        />
      </Box>
    </Box>
  );
};

export default SingleProduct;
