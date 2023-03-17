import { Select } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProductsByCategoryAction } from "../features/product/productSlice";
import UrlModifier from "../utils/_url_modifier";

const BrandFilter = () => {
  const dispatch = useDispatch();

  const { name } = useParams();
  const catNameFromUrl = name;

  const { brands } = useSelector((state) => state.brand);

  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    UrlModifier({ value: value, name: name });
    dispatch(getAllProductsByCategoryAction(catNameFromUrl));
  };

  return (
    <Select
      placeholder="All Brands"
      fontSize=".9rem"
      onChange={handleChange}
      defaultValue="All"
      variant={"filled"}
      name="brand"
      _focus={{ boxShadow: "none", borderColor: "none" }}
    >
      {brands.map(
        (brand) => (
          <option color="red" value={brand.name} key={brand._id}>
            {brand.name}
          </option>
        ),
        []
      )}
    </Select>
  );
};

export default BrandFilter;
