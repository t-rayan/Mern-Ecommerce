import { Box, Heading, Skeleton, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../features/category/categorySlice";

import SidemenuItem from "./SidemenuItem";

const UserSideMenu = () => {
  const dispatch = useDispatch();

  const { currentDevice } = useSelector((state) => state.ui);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllCategories());
    // if (currentDevice !== "mobile") {
    //   dispatch(hideSidebar());
    // }
  }, [dispatch, currentDevice]);

  return (
    <>
      <Box textAlign="left" px={"2rem"} py={5}>
        <Heading fontWeight="bold" fontSize="1.7rem">
          TECH-HIVE
        </Heading>
      </Box>
      <Box my={5}>
        <SidemenuItem
          menuTitle="Shop"
          // linkIcon={FaMobile}
          place={`/`}
        />
        {categories.length < 1 && (
          <Stack px={10} spacing={5}>
            <Skeleton bg="gray.200" width="70%" height="25px" />
            <Skeleton height="25px" />
            <Skeleton width="70%" height="25px" />
            <Skeleton height="25px" />
            <Skeleton width="70%" height="25px" />

            <Skeleton width="70%" height="25px" />

            <Skeleton height="25px" />
          </Stack>
        )}
        {categories?.map((cat) => (
          <SidemenuItem
            menuTitle={cat.name}
            key={cat._id}
            // linkIcon={FaMobile}
            place={`category/${cat.name}`}
          />
        ))}
      </Box>
    </>
  );
};

export default UserSideMenu;
