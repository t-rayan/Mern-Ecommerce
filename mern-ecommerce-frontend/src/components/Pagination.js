import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCategories } from "../features/category/categorySlice";
import UrlModifier from "../utils/_url_modifier";

const Pagination = ({ tPages, page, setPage }) => {
  const dispatch = useDispatch();
  // const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(tPages || 5);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    // when user clicks pagination buttons
    // first it will set page value
    // it will set query params page in url
    UrlModifier({ name: "page", value: newPage });
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
  };

  useEffect(() => {
    setTotalPages(tPages);
  }, [dispatch, page, tPages]);

  return (
    <Flex
      mt="5"
      justifyContent={"start"}
      alignItems="center"
      w="100%"
      p="2"
      gap={4}
    >
      <IconButton
        icon={<ChevronLeftIcon />}
        onClick={() => handlePageChange(page - 1)}
        isDisabled={page === 1}
        bg="gray.200"
        size={{ base: "xs" }}
      />
      <Text size={"xs"}>
        Page {page} of {totalPages}
      </Text>
      <IconButton
        icon={<ChevronRightIcon />}
        onClick={() => handlePageChange(page + 1)}
        isDisabled={page === totalPages}
        bg="gray.200"
        size={{ base: "xs" }}
      />
    </Flex>
  );
};

export default Pagination;
