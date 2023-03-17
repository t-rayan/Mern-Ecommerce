import { Box, Button, Heading } from "@chakra-ui/react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllProductsByCategoryAction,
  resetFilter,
} from "../features/product/productSlice";
import SingleProduct from "../components/SingleProduct";
import FilterPanel from "../components/FilterPanel";
import LoadingState from "../components/LoadingState";

const CatAndProducts = () => {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const { products, isLoading } = useSelector((state) => state.products);

  const { name } = useParams();

  useEffect(() => {
    dispatch(getAllProductsByCategoryAction(name));
    return () => {
      dispatch(resetFilter());
    };
  }, [name, dispatch, searchParams]);

  return (
    <Box>
      <Heading size="lg"> {name}</Heading>
      <Box
        my={5}
        display="grid"
        gap={"1rem"}
        gridTemplateRows=".25fr auto"
        alignItems="start"
        w="100%"
        height={"100%"}
      >
        <Box borderRadius={10}>
          <FilterPanel />
        </Box>
        {isLoading ? (
          <LoadingState />
        ) : (
          <>
            <Box display="grid">
              {products?.length > 0 ? (
                <Box
                  display="grid"
                  rowGap={"2rem"}
                  columnGap="4rem"
                  alignItems="stretch"
                  gridTemplateColumns="repeat( auto-fill, minmax(15rem, 1fr) );"
                >
                  {products?.map((prod) => (
                    <SingleProduct product={prod} key={prod?._id} />
                  ))}
                </Box>
              ) : (
                <Box display={"grid"} placeItems="center">
                  <Box textAlign="center">
                    <Heading size="sm"> No product found </Heading>
                    <Button
                      variant="link"
                      onClick={() => window.location.reload(false)}
                    >
                      Go Back
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default CatAndProducts;
