import { Box, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../features/product/productSlice";
import SingleProduct from "../components/SingleProduct";

const CatAndProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const { category } = useParams();

  const filterByCategory = products?.filter(
    (product) => product?.category?.name === category
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <Box>
      <Heading size="md"> {category}</Heading>
      <Box
        mt={5}
        display="grid"
        gap={5}
        gridTemplateColumns="repeat( auto-fill, minmax(230px, 1fr) );"
      >
        {filterByCategory.map((prod) => (
          <SingleProduct product={prod} key={prod?._id} />
        ))}
      </Box>
    </Box>
  );
};

export default CatAndProducts;
