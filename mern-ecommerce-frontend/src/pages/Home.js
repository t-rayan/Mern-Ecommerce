import React from "react";

import { Box, Button, Grid, Heading, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import SideMenu from "../components/SideMenu";
import Navbar from "../components/Navbar";
import useMedia from "../hooks/useMedia";
import { Outlet } from "react-router-dom";
import UtilityBar from "../components/UtilityBar";
import { getAllProducts } from "../features/product/productSlice";
import SingleProduct from "../components/SingleProduct";
import LoadingState from "../components/LoadingState";
import ShopBanner from "../components/ShopBanner";

const Home = () => {
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.auth);
  const { products, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <Grid gap="3rem">
      <ShopBanner />
      <Box>
        {/* <UtilityBar /> */}
        <Box mt="3rem">
          <Heading size="md">All Products</Heading>

          <Box
            mt={5}
            display="grid"
            gap={5}
            gridTemplateColumns="repeat( auto-fit, minmax(250px, 1fr) );"
          >
            {products?.map((product) => (
              <SingleProduct key={product?._id} product={product} />
            ))}
          </Box>
        </Box>
      </Box>
      {products?.length > 0 && (
        <Button size="lg" justifySelf="center">
          Load More
        </Button>
      )}
    </Grid>
  );
};

export default Home;
