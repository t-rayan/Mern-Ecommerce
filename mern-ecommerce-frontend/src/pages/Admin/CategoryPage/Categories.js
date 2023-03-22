import React, { useRef, useState } from "react";

import { useEffect } from "react";
import EmptyState from "../../../components/EmptyState";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { SearchIcon } from "@chakra-ui/icons";

import PopMenu from "../../../components/PopMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  removeCategory,
  reset,
  filterCategory,
  resetCategory,
  getCategory,
} from "../../../features/category/categorySlice";
import LoadingState from "../../../components/LoadingState";
import { RiAddFill } from "react-icons/ri";
import UrlModifier from "../../../utils/_url_modifier";
import { GetQueryParams } from "../../../utils/GetQueryParams";
import Pagination from "../../../components/Pagination";

const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const inputRef = useRef();

  const { categories, pagination } = useSelector((state) => state.categories);

  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    UrlModifier({ name: "q", value: e.target.value });
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch, searchQuery, page]);

  return (
    <>
      {/* {isLoading ? (
        <LoadingState />
      ) : categories.length === 0 ? (
        <EmptyState title="Categories" goto={() => navigate("add")} />
      ) : ( */}
      <Stack spacing="10">
        {/* header */}
        <Flex justifyContent="space-between" alignItems="flex-end">
          <Heading size="md">Categories</Heading>
          {/* <Button
              size="sm"
              colorScheme="teal"
              leftIcon={<FaPlus />}
              borderRadius="full"
              onClick={() => navigate("add")}
            >
              Add
            </Button> */}

          <Button
            bg="gray.800"
            color="gray.200"
            fontSize=".8rem"
            fontWeight="bold"
            leftIcon={<RiAddFill size="1.1rem" />}
            _hover={{ bg: "gray.700" }}
            _active={{ bg: "gray.700" }}
            borderRadius="md"
            onClick={() => navigate("add")}
          >
            Add
          </Button>
        </Flex>
        {/* search input */}
        <Box>
          <form>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                type="text"
                name="q"
                value={searchQuery}
                placeholder="Search"
                borderColor="gray.300"
                onChange={handleChange}
                ref={inputRef}
              />
            </InputGroup>
          </form>
        </Box>
        {/* content table */}
        <Table variant="simple" size="md" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>NAME</Th>
              <Th>OPTIONS</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories?.map((cat) => (
              <Tr key={cat?._id}>
                <Td>{cat?.name}</Td>
                <Td>
                  <PopMenu
                    deleteFunc={() => dispatch(removeCategory(cat?._id))}
                    editFunc={() => {
                      navigate(cat?._id);
                    }}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Pagination
          page={page}
          setPage={setPage}
          tPages={pagination?.totalPages}
        />
      </Stack>
      {/* )} */}
    </>
  );
};

export default Categories;
