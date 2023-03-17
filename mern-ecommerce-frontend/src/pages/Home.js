import React from "react";

import { Box, Button, Grid, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllProducts } from "../features/product/productSlice";
import SingleProduct from "../components/SingleProduct";
import LoadingState from "../components/LoadingState";
import ShopBanner from "../components/ShopBanner";

const Home = () => {
  const dispatch = useDispatch();
  const { products, filterGroup, isLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getAllProducts(filterGroup));
  }, [dispatch, filterGroup]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <Grid>
      <ShopBanner />
      <Box>
        {/* <UtilityBar /> */}
        <Box mt="3rem">
          <Heading size="md">All Products</Heading>

          <Box
            mt={10}
            display="grid"
            rowGap={"4rem"}
            columnGap={"2rem"}
            gridTemplateColumns="repeat( auto-fit, minmax(15rem, 1fr) );"
          >
            {products?.map((product) => (
              <SingleProduct key={product?._id} product={product} />
            ))}
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default Home;
