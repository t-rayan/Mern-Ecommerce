import { Box, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decQty, incQty } from "../features/cart/cartSlice";
import useMedia from "../hooks/useMedia";

const QtyController = ({ id, qty }) => {
  const dispatch = useDispatch();
  const { currentDevice } = useSelector((state) => state.ui);
  const { sm } = useMedia();

  return (
    <Box display="flex" alignItems="center" gap={3}>
      <Button
        size={sm ? "xs" : "sm"}
        disabled={qty === 1 ? true : false}
        onClick={() => dispatch(decQty({ id }))}
      >
        {" "}
        -{" "}
      </Button>
      <Text fontSize={sm ? ".8rem" : "1rem"}>{qty}</Text>
      <Button size={sm ? "xs" : "sm"} onClick={() => dispatch(incQty({ id }))}>
        {" "}
        +{" "}
      </Button>
    </Box>
  );
};

export default QtyController;
