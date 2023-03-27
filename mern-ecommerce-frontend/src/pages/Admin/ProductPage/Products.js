import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  removeProduct,
} from "../../../features/product/productSlice";
import { RiAddFill } from "react-icons/ri";
import { SearchIcon } from "@chakra-ui/icons";
import PopMenu from "../../../components/PopMenu";
import useMedia from "../../../hooks/useMedia";
import UrlModifier from "../../../utils/_url_modifier";
import Pagination from "../../../components/Pagination";
import { ProductCardUI } from "../../../components/cardui/ProductCardUI";
import CardLayout from "../../../layouts/CardLayout";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { products, pagination, isLoading } = useSelector(
    (state) => state.products
  );

  const handleChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    UrlModifier({ name: "q", value: e.target.value });
  };

  const { sm, md } = useMedia();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch, searchQuery, page]);

  return (
    <CardLayout title="Product List">
      <Flex justifyContent={"space-between"} alignItems="center" gap={5}>
        <InputGroup flexBasis={"20rem"}>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            type="text"
            name="q"
            placeholder="Search"
            borderColor="gray.300"
            onChange={handleChange}
          />
        </InputGroup>
        <Button
          bg={"blue.500"}
          size="md"
          color="white"
          fontSize=".8rem"
          fontWeight="bold"
          leftIcon={<RiAddFill size="1rem" />}
          _hover={{ bg: "blue.600" }}
          _active={{ bg: "blue.700" }}
          rounded="md"
          onClick={() => navigate("add")}
        >
          Add
        </Button>
      </Flex>

      <Box
        textAlign={"center"}
        // p={"3rem 2rem"}
        borderRadius="10px"
        w={"100%"}
        overflowX={"auto"}
      >
        {/* content table */}
        {isLoading ? (
          <Spinner textAlign={"center"} />
        ) : (
          <Table
            variant="simple"
            size="md"
            w="100%"
            // w="min-width"
            minWidth="700px"
            color="gray.400"
          >
            <Thead>
              <Tr>
                <Th>
                  <Text>NAME</Text>
                </Th>
                <Th>REMAINING</Th>
                <Th>PRICE</Th>
                <Th>OPTIONS</Th>
              </Tr>
            </Thead>

            <Tbody>
              {products?.map((product) => (
                <Tr key={product._id}>
                  <Td
                    display="flex"
                    flexDir={sm ? "column" : "row"}
                    alignItems="start"
                    gap="3"
                  >
                    <Box>
                      <Image
                        src={
                          product?.images !== null &&
                          product?.images[0]?.img_url
                        }
                        alt="pimg"
                        borderRadius="md"
                        w="100%"
                        boxSize="40px"
                      />
                    </Box>
                    <Text textAlign="center" fontSize={sm ? ".7rem" : "1rem"}>
                      {product.name}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize={sm ? ".7rem" : "1rem"}>
                      {product.inventory}
                    </Text>
                  </Td>
                  <Td textAlign={"left"}>
                    <Text fontSize={sm ? ".7rem" : "1rem"}>
                      {product.price}
                    </Text>
                  </Td>
                  <Td textAlign={"left"}>
                    <PopMenu
                      deleteFunc={() => dispatch(removeProduct(product._id))}
                      editFunc={() => {
                        navigate(product._id);
                        // dispatch(reset());
                      }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}

        {/* {products?.map((product) => (
              <ProductCardUI product={product} />
            ))} */}
      </Box>
      {!isLoading && (
        <Pagination
          page={page}
          setPage={setPage}
          tPages={pagination?.totalPages}
        />
      )}
    </CardLayout>
  );
};

export default Products;
