import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  RiAccountBoxFill,
  RiAccountBoxLine,
  RiFilter3Fill,
  RiMenu2Line,
  RiShoppingBag2Line,
  RiShoppingCart2Fill,
} from "react-icons/ri";
import { MdArrowDropDown } from "react-icons/md";
import Searchbar from "./Searchbar";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../features/ui/uiSlice";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import FiltersDrawer from "./FiltersDrawer";
import GetInitials from "../utils/GetInitials";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { logoutUser } from "../features/auth/authSlice";
import { setCategoryFilters } from "../features/product/productSlice";

const ShopNavbar = () => {
  const { currentDevice } = useSelector((state) => state.ui);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuItemClick = (val) => {
    navigate(`category/${val}`);
    dispatch(setCategoryFilters(val));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    return <Navigate to="/login" />;
  };

  return (
    <>
      {/* main content goes here */}
      <Box
        pos="fixed"
        top="0"
        left={0}
        px={5}
        zIndex="1"
        w="100%"
        bg="#fff"
        py={3}
        gap={3}
        borderBottom="1px solid"
        borderColor="inherit"
      >
        <Grid
          width="inherit"
          dispaly="grid"
          gridTemplateColumns={
            currentDevice !== "mobile" ? ".3fr 1fr .3fr" : "1fr 1fr"
          }
          justifyContent="space-between"
          alignItems="center"
          gap="2.5rem"
        >
          {/* logo */}
          <Flex alignItems="center" gap={2}>
            {currentDevice !== "large" && (
              <Icon
                h={5}
                w={5}
                as={RiMenu2Line}
                color="green.800"
                cursor="pointer"
                onClick={() => dispatch(toggleSidebar())}
              />
            )}

            <Box bg="orange">
              <Text
                fontWeight="bold"
                color="gray.800"
                p={1}
                fontSize={currentDevice === "mobile" ? "1.3rem" : "1.1rem"}
                letterSpacing={1.7}
                cursor="pointer"
                onClick={() => navigate("/")}
              >
                smart hive
              </Text>
            </Box>
          </Flex>

          {/* main nav bar */}

          {currentDevice !== "mobile" && (
            <Grid
              templateColumns={currentDevice === "large" ? ".3fr 1fr " : "1fr"}
              justifyContent="space-between"
              alignItems="center"
              gap="5"
            >
              {currentDevice === "large" && (
                <Box zIndex="1111">
                  <Menu>
                    <MenuButton
                      size="md"
                      as={Button}
                      // py="1.5rem"
                      w="full"
                      fontWeight="normal"
                      fontSize=".9rem"
                      // textAlign="left"
                      color={"gray.700"}
                      bg="none"
                      borderColor="inherit"
                      _hover={{ bg: "none" }}
                      _active={{ bg: "none" }}
                      _focus={{ boxShadow: "none" }}
                      rightIcon={<MdArrowDropDown />}
                    >
                      All Categories
                    </MenuButton>
                    <Portal>
                      <MenuList>
                        {categories?.map((cat) => (
                          <Box key={cat._id}>
                            <MenuItem
                              _hover={{ bg: "orange.300" }}
                              fontSize=".9rem"
                              fontweight="light"
                              key={cat._id}
                              onClick={() => handleMenuItemClick(cat.name)}
                            >
                              {" "}
                              {cat.name}{" "}
                            </MenuItem>
                            {/* <MenuDivider /> */}
                          </Box>
                        ))}
                      </MenuList>
                    </Portal>
                  </Menu>
                </Box>
              )}
              <Grid
                templateColumns="1fr"
                justifyContent="space-between"
                alignItems="center"
                gap={3}
              >
                <Searchbar />
              </Grid>
            </Grid>
          )}

          {/* cart link and login register button */}
          <Flex gap="4" justifySelf="end">
            {/* cart link */}
            <Flex
              gap={1}
              alignItems="center"
              cursor="pointer"
              onClick={() => navigate("/checkout")}
            >
              <Box display={"flex"} flexDir="row" pos="relative">
                <Icon as={RiShoppingBag2Line} w={5} h={5} color="gray.700" />
                {/* if cart items length is greater than 0 */}
                {cartItems.length > 0 && (
                  <Box
                    w={3}
                    h={3}
                    pos="absolute"
                    top="-1"
                    right="-1"
                    bg="red.500"
                    borderRadius="full"
                  ></Box>
                )}
              </Box>
              <Text fontWeight="normal" color="gray.700">
                Cart
              </Text>
            </Flex>

            {/* if user is not logged in then display login button */}
            {!userInfo && (
              <Button
                bg="none"
                fontWeight={"normal"}
                // leftIcon={<Icon as={RiAccountBoxLine} w={6} h={6} />}
                onClick={() => navigate("/login")}
              >
                Account
              </Button>
            )}

            {/* else if user is logged in and user is not an admin then display user links */}
            {/* Menu button icon */}
            {userInfo && !userInfo.isAdmin && (
              <Menu>
                <MenuButton
                  bg="transparent"
                  // p="1.5rem"
                  p="0"
                  _hover={{ bg: "transparent" }}
                  _focus={{ outline: "none", bg: "transparent" }}
                  _active={{ outline: "none", bg: "transparent" }}
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                >
                  <Box
                    w={10}
                    h={10}
                    bg="green.300"
                    borderRadius="100%"
                    display="grid"
                    placeItems="center"
                  >
                    <Text>{GetInitials(userInfo?.fullname)}</Text>
                  </Box>
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link to={`/user/${userInfo.id}`}>Profile</Link>
                  </MenuItem>
                  <MenuItem>Settings</MenuItem>

                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Grid>

        <Box>
          {currentDevice === "mobile" && (
            <Grid
              templateColumns="1fr"
              justifyContent="space-between"
              alignItems="center"
              gap={3}
            >
              <Searchbar />
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ShopNavbar;
