import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleProduct from "../components/SingleProduct";
import { getAllProducts, resetFilter } from "../features/product/productSlice";
import queryString from "query-string";
import LoadingState from "../components/LoadingState";

const SearchResults = () => {
  const dispatch = useDispatch();

  const { products, filterGroup, isLoading } = useSelector(
    (state) => state.products
  );

  const { searchFilter } = filterGroup;
  const queryParams = queryString.parse(window.location.search);
  const searchQuery = queryParams.q;

  useEffect(() => {
    dispatch(getAllProducts());
    return () => {
      dispatch(resetFilter());
    };
  }, [dispatch, searchQuery, searchFilter]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <>
      <Heading mb={"3rem"} size="md" fontWeight="medium">
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
          <SingleProduct key={product._id} product={product} />
        ))}
      </Box>
    </>
  );
};

export default SearchResults;
