import { Box, Heading, Icon, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { RiCloseLine, RiMenu2Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllCategories } from "../features/category/categorySlice";
import { hideSidebar, toggleSidebar } from "../features/ui/uiSlice";
import useMedia from "../hooks/useMedia";
import AppSkeleton from "./AppSkeleton";
import SideMenu from "./SideMenu";
import { motion } from "framer-motion";
import {
  resetFilter,
  setCategoryFilters,
} from "../features/product/productSlice";
import SidemenuItem from "./SidemenuItem";
import { FaMobile } from "react-icons/fa";

const UserSideMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSidebar, currentDevice } = useSelector((state) => state.ui);
  const { categories, isLoading } = useSelector((state) => state.categories);

  let results;

  if (categories.length > 0) {
    results = categories.map((cat) => cat.name);
  }

  useEffect(() => {
    dispatch(getAllCategories());
    // if (currentDevice !== "mobile") {
    //   dispatch(hideSidebar());
    // }
  }, [dispatch, currentDevice]);

  const itemVariants = {
    closed: {
      opacity: 0,
    },
    open: { opacity: 1 },
  };

  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        staggerDirection: 1,
      },
    },
  };

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
