import { Box, Select } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProductsByCategoryAction } from "../features/product/productSlice";
import UrlModifier from "../utils/_url_modifier";

const SortFilter = () => {
  const dispatch = useDispatch();

  const { name } = useParams();
  const catNameFromUrl = name;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    UrlModifier({ name, value });
    dispatch(getAllProductsByCategoryAction(catNameFromUrl));

    // const url = new URL(window.location.href);
    // const params = new URLSearchParams(url.search);
    // const sortFilter = params.has(name);
    // sortFilter ? params.set(name, value) : params.append(name, value);
    // console.log(params.toString());

    // window.history.replaceState({}, "", `${url.pathname}?${params}`);
  };

  return (
    <Box>
      <Select
        placeholder="Sort By"
        fontSize=".9rem"
        _focus={{ boxShadow: "none", borderColor: "none" }}
        onChange={handleChange}
        name="sort"
      >
        <option value="asc">A - Z</option>
        <option value="dsc">Z - A</option>
        <option value="price_asc">Price: Low-High</option>
        <option value="price_dsc">Price: High-Low</option>
      </Select>
    </Box>
  );
};

export default SortFilter;
