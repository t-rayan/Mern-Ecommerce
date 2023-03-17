import { Box, Button, Flex, Grid, Heading, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import OrderSummary from "../components/OrderSummary";
import useMedia from "../hooks/useMedia";
import emptyCartImg from "../images/empty-cart.svg";

const Cartpage = () => {
  const location = useLocation();

  const getPageTitle = () => {
    const currentPath = location.pathname;
    const replaced = currentPath.replace("/", "");
    const secondReplaced = replaced.replace("/", ",");
    const titleArr = secondReplaced.split(",");
    return titleArr;
  };

  const titlesFromUrl = getPageTitle();

  const { cartItems } = useSelector((state) => state.cart);

  const { sm, md } = useMedia();

  const responsiveCart = () => {
    if (sm || md) {
      return "1fr";
    } else {
      return "1fr 35%";
    }
  };

  if (cartItems.length === 0) {
    return <EmptyCartScreen />;
  }

  return (
    <>
      <Flex alignItems="end" mb="5">
        <BackBtn iconSize={"25px"} />
        <Heading textTransform={"capitalize"}>
          {titlesFromUrl.length > 1 ? titlesFromUrl[1] : titlesFromUrl[0]}
        </Heading>
      </Flex>

      <Grid
        gridTemplateColumns={responsiveCart()}
        gridTemplateRows={"1fr"}
        py="1rem"
        gap="3rem"
        alignItems={"start"}
      >
        <Box>
          <Outlet />
        </Box>
        <Box>
          <OrderSummary pageTitles={titlesFromUrl} />
        </Box>
      </Grid>
    </>
  );
};

// child components
const EmptyCartScreen = () => {
  const navigate = useNavigate();
  return (
    <Box py={"10%"}>
      <Box
        display="grid"
        w="100%"
        placeItems="center"
        gap={20}
        // bg="orange.100"
        // borderRadius="100%"
      >
        <Image w="230px" h="230px" src={emptyCartImg} />
      </Box>
      <Box mt="5">
        <Heading textAlign={"center"} size="md" color="gray.400">
          Cart is empty
        </Heading>
        <Box mt={5} display="flex" justifyContent="center">
          {/* <BackBtn btnTitle={"Continue Shopping"} /> */}
          <Button onClick={() => navigate("/")}>Back to Shop</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Cartpage;
