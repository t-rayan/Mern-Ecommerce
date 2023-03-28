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
  Card,
  CardHeader,
  CardBody,
  Divider,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import PopMenu from "../../../components/PopMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  removeCategory,
} from "../../../features/category/categorySlice";
import { RiAddFill } from "react-icons/ri";
import UrlModifier from "../../../utils/_url_modifier";
import Pagination from "../../../components/Pagination";
import CardLayout from "../../../layouts/CardLayout";
import LoadingState from "../../../components/LoadingState";

const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const inputRef = useRef();

  const { categories, pagination, isLoading } = useSelector(
    (state) => state.categories
  );

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
    <CardLayout title="Category List">
      <Flex justifyContent={"space-between"} alignItems="center" gap={5}>
        <InputGroup flexBasis={"20rem"}>
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
        <Button
          bg={"blue.500"}
          size="md"
          color="white"
          fontSize=".8rem"
          fontWeight="bold"
          leftIcon={<RiAddFill size="1rem" />}
          _hover={{ bg: "blue.600" }}
          _active={{ bg: "blue.700" }}
          rounded="md"
          onClick={() => navigate("add")}
        >
          Add
        </Button>
      </Flex>

      {isLoading ? (
        <LoadingState />
      ) : (
        <>
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
        </>
      )}
    </CardLayout>
  );
};

export default Categories;
