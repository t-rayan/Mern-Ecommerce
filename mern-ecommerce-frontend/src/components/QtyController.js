import { Box, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decQty, incQty } from "../features/cart/cartSlice";

const QtyController = ({ id, qty }) => {
  const dispatch = useDispatch();
  const { currentDevice } = useSelector((state) => state.ui);

  return (
    <Box display="flex" alignItems="center" gap={3}>
      <Button
        size={currentDevice === "mobile" ? "xs" : "sm"}
        disabled={qty === 1 ? true : false}
        onClick={() => dispatch(decQty({ id }))}
      >
        {" "}
        -{" "}
      </Button>
      <Text>{qty}</Text>
      <Button
        size={currentDevice === "mobile" ? "xs" : "sm"}
        onClick={() => dispatch(incQty({ id }))}
      >
        {" "}
        +{" "}
      </Button>
    </Box>
  );
};

export default QtyController;
