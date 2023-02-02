// import { SearchIcon } from "@chakra-ui/icons";
// import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import productServices from "../features/product/productServices";
// import {
//   getAllProducts,
//   searchProducts,
// } from "../features/product/productSlice";

// const AdminSearchbar = () => {
//   const dispatch = useDispatch();
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     console.log(query);
//     query.length > 3 && dispatch(searchProducts(query));
//   }, [dispatch, query]);

//   const handleChange = (e) => {
//     e.preventDefault();
//     setQuery(e.target.value);
//   };

//   return (
//     <form>
//       <InputGroup>
//         <InputLeftElement
//           pointerEvents="none"
//           children={<SearchIcon color="gray.300" />}
//         />
//         <Input
//           type="text"
//           placeholder="Search"
//           borderColor="gray.300"
//           onChange={handleChange}
//         />
//       </InputGroup>
//     </form>
//   );
// };

// export default AdminSearchbar;
