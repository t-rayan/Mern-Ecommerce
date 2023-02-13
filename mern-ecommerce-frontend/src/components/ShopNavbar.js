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
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  RiFilter3Fill,
  RiMenu2Line,
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

const ShopNavbar = () => {
  const { currentDevice } = useSelector((state) => state.ui);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [isFilterDrawer, setIsFilterDrawer] = useState(false);
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name } = useParams();
  const location = useLocation();

  const handleMenuItemClick = (val) => {
    navigate(`category/${val}`);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    return <Navigate to="/login" />;
  };

  return (
    <>
      {/* showing filter drawer if filter is true */}
      <FiltersDrawer
        isOpen={isFilterDrawer}
        onClose={() => setIsFilterDrawer(false)}
      />

      {/* main content goes here */}
      <Box
        display="grid"
        alignItems="center"
        pos="fixed"
        top="0"
        left={0}
        px={5}
        zIndex="1"
        w="100%"
        bg="#fff"
        py={5}
        gap={3}
        borderBottom="1px solid"
        borderColor="gray.300"
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

            <Text
              fontWeight="bold"
              color="green.800"
              fontSize={currentDevice === "mobile" ? "1.3rem" : "1.5rem"}
              cursor="pointer"
              onClick={() => navigate("/")}
            >
              SmartHive
            </Text>
          </Flex>

          {/* main nav bar */}

          {currentDevice !== "mobile" && (
            <Grid
              templateColumns={currentDevice === "large" ? ".2fr 1fr " : "1fr"}
              justifyContent="space-between"
              alignItems="center"
              gap={5}
            >
              {currentDevice === "large" && (
                <Box zIndex="1111">
                  <Menu>
                    <MenuButton as={Button} rightIcon={<MdArrowDropDown />}>
                      All Categories
                    </MenuButton>
                    <Portal>
                      <MenuList>
                        {categories?.map((cat) => (
                          <Box key={cat._id}>
                            <MenuItem
                              key={cat._id}
                              onClick={() => handleMenuItemClick(cat.name)}
                            >
                              {" "}
                              {cat.name}{" "}
                            </MenuItem>
                            <MenuDivider />
                          </Box>
                        ))}
                      </MenuList>
                    </Portal>
                  </Menu>
                </Box>
              )}
              <Grid
                templateColumns="1fr .1fr"
                justifyContent="space-between"
                alignItems="center"
                gap={3}
              >
                <Searchbar />
                <Icon
                  cursor="pointer"
                  as={RiFilter3Fill}
                  w={5}
                  h={5}
                  onClick={() => setIsFilterDrawer(true)}
                />
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
              <Box pos="relative">
                <Icon as={RiShoppingCart2Fill} w={5} h={5} />
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
              <Text fontWeight="bold">Cart</Text>
            </Flex>

            {/* if user is not logged in then display login button */}
            {!userInfo && <Link to="/login">Login</Link>}

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
              templateColumns="1fr .1fr"
              justifyContent="space-between"
              alignItems="center"
              gap={3}
            >
              <Searchbar />
              <Icon
                cursor="pointer"
                as={RiFilter3Fill}
                w={5}
                h={5}
                onClick={() => setIsFilterDrawer(true)}
              />
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ShopNavbar;
