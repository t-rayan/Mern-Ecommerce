import React, { useState } from "react";
import { useEffect } from "react";
import EmptyState from "../../../components/EmptyState";
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
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  productSearch,
  removeProduct,
  reset,
  resetFilter,
  searchProducts,
} from "../../../features/product/productSlice";
import LoadingState from "../../../components/LoadingState";
import { RiAddFill } from "react-icons/ri";
import { SearchIcon } from "@chakra-ui/icons";
import PopMenu from "../../../components/PopMenu";
import useMedia from "../../../hooks/useMedia";
import useDataSort from "../../../hooks/useDataSort";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  const { isLoading, products, isDel, filteredProducts } = useSelector(
    (state) => state.products
  );
  const { isMobile } = useMedia();

  const [processedData] = useDataSort(products, searchQuery);
  console.log(processedData);

  useEffect(() => {
    if (filteredProducts?.length > 0) {
      setData(filteredProducts);
    } else {
      setData(products);
    }
  }, [filteredProducts, products]);

  useEffect(() => {
    if (searchQuery.length === 0) {
      dispatch(resetFilter());
      dispatch(getAllProducts());
    } else {
      dispatch(productSearch(searchQuery));
    }
  }, [dispatch]);

  if (isDel) {
    return <LoadingState title="Deleting product" />;
  }
  if (isLoading) {
    return <LoadingState />;
  }
  if (products.length === 0) {
    return <EmptyState title="Products" goto={() => navigate("add")} />;
  }
  return (
    <>
      <Stack spacing="10">
        {/* header */}
        <Flex justifyContent="space-between" alignItems="flex-end">
          <Heading size="md" color="gray.800">
            Products
          </Heading>
          <Button
            bg="gray.800"
            color="gray.200"
            fontSize=".8rem"
            fontWeight="bold"
            leftIcon={<RiAddFill size="1.1rem" />}
            _hover={{ bg: "gray.700" }}
            _active={{ bg: "gray.700" }}
            borderRadius="md"
            onClick={() => navigate("add")}
          >
            Add
          </Button>
        </Flex>

        <Box
          p={"3rem 2rem"}
          borderRadius="10px"
          shadow="lg"
          w="100%"
          overflowX={"scroll"}
        >
          {/* search input */}

          <Box mb="2rem">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                type="text"
                placeholder="Search"
                borderColor="gray.300"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
            </InputGroup>
          </Box>
          {/* content table */}
          <>
            {processedData?.length === 0 ? (
              <Box display="grid">
                <Heading size="md" color="gray.500">
                  No match found
                </Heading>
              </Box>
            ) : (
              <Table
                variant="simple"
                size="md"
                color="gray.400"
                fontWeight="medium"
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
                  {processedData?.map((product) => (
                    <Tr key={product._id}>
                      <Td
                        display="flex"
                        flexDir={isMobile ? "column" : "row"}
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
                        <Text
                          textAlign="center"
                          fontSize={isMobile ? ".7rem" : "1rem"}
                        >
                          {product.name}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize={isMobile ? ".7rem" : "1rem"}>
                          {product.inventory}
                        </Text>
                      </Td>
                      <Td textAlign={"left"}>
                        <Text fontSize={isMobile ? ".7rem" : "1rem"}>
                          {product.price}
                        </Text>
                      </Td>
                      <Td textAlign={"left"}>
                        <PopMenu
                          deleteFunc={() =>
                            dispatch(removeProduct(product._id))
                          }
                          editFunc={() => {
                            navigate(product._id);
                            dispatch(reset());
                          }}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </>
        </Box>
      </Stack>
    </>
  );
};

export default Products;
