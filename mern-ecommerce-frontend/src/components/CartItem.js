import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import QtyController from "../components/QtyController";
import { removeFromCart } from "../features/cart/cartSlice";
import useMedia from "../hooks/useMedia";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const { currentDevice } = useSelector((state) => state.ui);

  const { sm } = useMedia();

  return (
    <Flex
      p=".8rem"
      rounded="md"
      alignItems="center"
      justifyContent="space-between"
      // shadow="2xl"
      border="1px solid #ddd"
      width="100%"
      my="2rem"
    >
      <Box>
        <Flex
          alignItems={currentDevice === "mobile" ? "start" : "center"}
          flexDir={currentDevice === "mobile" && "column"}
          gap={3}
        >
          <Box>
            <Image boxSize="50px" src={product?.thumbnail} />
          </Box>
          <Box>
            <Text fontSize={currentDevice === "mobile" ? ".75rem" : ".8rem"}>
              {product?.name}
            </Text>
            <Flex flexDir={"column"} mt={1}>
              <Text
                fontWeight="light"
                fontSize={currentDevice === "mobile" ? ".7rem" : ".8rem"}
                color="gray.500"
              >
                {product?.size} GB
              </Text>
              <Text
                fontWeight="light"
                fontSize={currentDevice === "mobile" ? ".7rem" : ".8rem"}
                color="gray.500"
              >
                {product.color}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>

      <Box>
        <QtyController qty={product.qty} id={product.id} />
      </Box>
      <Box textAlign="center">
        <Text fontSize={sm ? ".8rem" : ".9rem"}>{product.total}</Text>
      </Box>
      <Box>
        <Icon
          cursor="pointer"
          color="gray.500"
          as={RiDeleteBin5Line}
          h={10}
          w={10}
          borderRadius="100%"
          _hover={{ bg: "gray.100", color: "red.400" }}
          p="10px"
          onClick={() => dispatch(removeFromCart({ id: product.id }))}
        />
      </Box>
    </Flex>
  );
};

export default CartItem;
