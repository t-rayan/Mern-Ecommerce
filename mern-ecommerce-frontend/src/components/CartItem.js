import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import QtyController from "../components/QtyController";
import { removeFromCart } from "../features/cart/cartSlice";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const { currentDevice } = useSelector((state) => state.ui);
  return (
    <Grid
      p=".8rem"
      borderRadius="10px"
      templateColumns={
        currentDevice === "mobile"
          ? ".8fr .5fr .5fr  .1fr "
          : "1fr 8rem 5.5rem .1fr"
      }
      alignItems="center"
      justifyContent="space-between"
      // shadow="2xl"
      border="1px solid #ddd"
      width="100%"
      my="2rem"
    >
      <GridItem>
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
      </GridItem>
      {/* <GridItem>
        <Text fontSize={[".8rem", ".9rem"]}>${product.price}</Text>
      </GridItem> */}
      <GridItem>
        <QtyController qty={product.qty} id={product.id} />
      </GridItem>
      <GridItem textAlign="center">
        <Text fontSize=".9rem">{product.total}</Text>
      </GridItem>
      <GridItem>
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
      </GridItem>
    </Grid>
  );
};

export default CartItem;
