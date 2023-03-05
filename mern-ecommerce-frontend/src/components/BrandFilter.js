import { Select } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../features/brand/brandSlice";
import {
  getAllProducts,
  reset,
  resetFilter,
  setBrandFilters,
} from "../features/product/productSlice";

const BrandFilter = () => {
  const dispatch = useDispatch();

  const { filterGroup } = useSelector((state) => state.products);
  const { brands } = useSelector((state) => state.brand);
  const { brandFilter } = filterGroup;

  const handleChange = (e) => {
    e.preventDefault();

    const { value } = e.target;
    let myVal;

    value === "" ? (myVal = "All") : (myVal = value);
    dispatch(setBrandFilters(myVal));
  };

  useEffect(() => {
    dispatch(getAllBrands());
    brandFilter && dispatch(getAllProducts(filterGroup));
    // return () => {
    //   dispatch(resetFilter());
    //   // dispatch(reset());
    // };
  }, [dispatch, brandFilter, filterGroup]);

  return (
    <Select
      placeholder="All Brands"
      fontSize=".9rem"
      onChange={handleChange}
      defaultValue="All"
      _focus={{ boxShadow: "none", borderColor: "none" }}
    >
      {brands.map(
        (brand) => (
          <option value={brand.name} key={brand._id}>
            {brand.name}
          </option>
        ),
        []
      )}
    </Select>
  );
};

export default BrandFilter;
