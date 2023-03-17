import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OrderDetails from "../components/OrderDetails";
import { fetchSingleOrder } from "../features/order/orderSlice";

const SingleOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchSingleOrder(id));
  }, [id, dispatch]);

  return <>{order && <OrderDetails order={order} />}</>;
};

export default SingleOrder;
