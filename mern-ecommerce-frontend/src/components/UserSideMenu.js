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

const UserSideMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSidebar, currentDevice } = useSelector((state) => state.ui);
  const { categories, isLoading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllCategories());
    if (currentDevice !== "mobile") {
      dispatch(hideSidebar());
    }
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
    isSidebar && (
      <Box
        as={motion.div}
        initial={{ width: 0 }}
        animate={{ width: 300 }}
        h="100vh"
        maxH="100vh"
        // borderRight="2px"
        borderRightColor="gray.200"
        pos="fixed"
        bg="white"
        shadow="md"
        top={0}
        left={0}
        zIndex="1111"
        // w="300px"
        backdropBlur={5}
      >
        <Box display="grid" gridTemplateRows="5rem 1fr">
          <Box
            w="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            // borderBottom="1px"
            // borderBottomColor="gray.100"
            px={5}
          >
            <Heading color="green.500" size="md">
              {" "}
              SmartHive{" "}
            </Heading>
            <Icon
              as={RiCloseLine}
              w={"20px"}
              h={"20px"}
              color="gray.400"
              cursor="pointer"
              _hover={{ color: "black" }}
              onClick={() => dispatch(hideSidebar())}
            />
          </Box>
          <Box>
            <Box
              display="flex"
              flexDir="column"
              alignItems={"start"}
              px={5}
              py={10}
            >
              <Text
                mb={3}
                fontWeight="bold"
                fontSize="1.1rem"
                cursor="pointer"
                color="gray.600"
                px={3}
                onClick={() => navigate("/")}
              >
                All Categories
              </Text>
              <Box
                as={motion.div}
                initial="closed"
                animate="open"
                variants={sideVariants}
                display="grid"
                gap={2}
                w="100%"
              >
                {isLoading && <AppSkeleton />}

                {categories?.map((cat) => (
                  <Box as={motion.div} variants={itemVariants} key={cat._id}>
                    <NavLink
                      to={`/${cat?.name.replace(/\s/g, "")}/products`}
                      cursor={"pointer"}
                      fontWeight="medium"
                      key={cat?._id}
                      onClick={() => {
                        dispatch(hideSidebar());
                      }}
                    >
                      {({ isActive }) => (
                        <Box
                          p={3}
                          borderRadius="5px"
                          bg={isActive && "orange.100"}
                          _hover={{ bg: "gray.100" }}
                          shadow={isActive && "sm"}
                        >
                          <Text
                            fontWeight={isActive && "medium"}
                            color={isActive ? "orange.600" : "gray.500"}
                          >
                            {cat?.name}
                          </Text>
                        </Box>
                      )}
                    </NavLink>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  );
};

export default UserSideMenu;
