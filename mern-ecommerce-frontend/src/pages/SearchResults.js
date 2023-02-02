import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import SingleProduct from "../components/SingleProduct";
import { searchProducts } from "../features/product/productSlice";

const SearchResults = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("query");

  useEffect(() => {
    dispatch(searchProducts(searchQuery));
  }, [dispatch, searchQuery]);

  return (
    <Box>
      <BackBtn btnTitle="Search Results" />
      {products?.length === 0 ? (
        <Box my={5}>
          <Heading color="gray.400" size="md">
            0 results found
          </Heading>
        </Box>
      ) : (
        <>
          <Heading my={"3rem"} size="md" fontWeight="medium">
            {" "}
            {products?.length} {products?.length === 1 ? "result" : "results "}
            found for "{searchQuery}"
          </Heading>
          <Box
            display="grid"
            gap={5}
            gridTemplateColumns="repeat( auto-fill, minmax(250px, 1fr) );"
          >
            {products?.map((product) => (
              <SingleProduct product={product} />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default SearchResults;
