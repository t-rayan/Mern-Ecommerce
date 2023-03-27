import { useEffect, useState } from "react";
import EmptyState from "../../../components/EmptyState";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { SearchIcon } from "@chakra-ui/icons";

import { fetchAllOrders } from "../../../features/order/orderSlice";

import Pagination from "../../../components/Pagination";
import UrlModifier from "../../../utils/_url_modifier";
import OrderContainer from "./OrderContainer";
import CardLayout from "../../../layouts/CardLayout";

const Orders = () => {
  const dispatch = useDispatch();

  const [currentOrder, setCurrentOrder] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(1);

  const { isLoading, pagination, orders } = useSelector((state) => state.order);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    UrlModifier({ name: "q", value: e.target.value });
  };

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch, page, searchQuery]);

  return (
    <CardLayout title={"Order List"}>
      {/* search input */}
      <Box>
        <InputGroup maxW="20rem">
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
      </Box>

      {isLoading ? (
        <Grid placeItems="center" minH="400px">
          <Spinner />
        </Grid>
      ) : (
        <>
          <OrderContainer
            orders={orders}
            setCurrentOrder={setCurrentOrder}
            setDeliveryStatus={setDeliveryStatus}
          />

          <Pagination
            page={page}
            setPage={setPage}
            tPages={pagination?.totalPages}
          />
        </>
      )}
    </CardLayout>
  );
};

export default Orders;
