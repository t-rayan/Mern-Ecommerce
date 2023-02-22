import { Box, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../features/product/productSlice";
import SingleProduct from "../components/SingleProduct";
import FilterPanel from "../components/FilterPanel";

const CatAndProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const { name } = useParams();

  const filterByCategory = products?.filter(
    (product) => product?.category?.name === name
  );

  useEffect(() => {
    dispatch(getAllProducts({ category: name }));
  }, [dispatch, name]);
  return (
    <Box minH="100vh">
      <Heading size="md"> {name}</Heading>
      <Box
        mt={10}
        display="grid"
        gap={"4rem"}
        gridTemplateColumns=".25fr 1fr"
        alignItems="start"
        w="100%"
        h="100%"
      >
        <Box bg="gray.100" borderRadius={10}>
          <FilterPanel />
        </Box>

        <Box
          display="grid"
          gap={5}
          alignItems="stretch"
          gridTemplateColumns="repeat( auto-fill, minmax(230px, 1fr) );"
        >
          {filterByCategory.map((prod) => (
            <SingleProduct product={prod} key={prod?._id} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CatAndProducts;
