import { Box, HStack, IconButton } from "@chakra-ui/react";
import {
  RiShoppingBag3Line,
  RiShoppingBagFill,
  RiShoppingCart2Line,
  RiUser2Line,
} from "react-icons/ri";
import Searchbar from "./Searchbar";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { logoutUser } from "../features/auth/authSlice";
import useMedia from "../hooks/useMedia";
import MenuToggler from "./MenuToggler";
import UserAvatar from "./UserAvatar";
import { FaCartPlus } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";

const ShopNavbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    return <Navigate to="/login" />;
  };

  const { sm, md, lg } = useMedia();
  const getNavbarWidth = () => {
    if (sm || md) {
      return "100%";
    } else if (lg) {
      return "calc(100% - 240px)";
    } else {
      return "calc(100% - 280px)";
    }
  };

  return (
    <>
      <Box
        px={sm ? 5 : 10}
        py={5}
        area={"header"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={sm ? 3 : 10}
        maxH="6rem"
        pos="fixed"
        top="0"
        right="0"
        bg="white"
        w={getNavbarWidth()}
        zIndex="111"
        shadow={"sm"}
      >
        <Box flexBasis="35rem" display={"flex"} gap={1} alignItems="center">
          {(sm || md) && (
            <Box flex="none">
              <MenuToggler />
            </Box>
          )}
          <Box flex="1">
            {" "}
            <Searchbar />
          </Box>
        </Box>
        <HStack>
          <Box pos="relative">
            <IconButton
              variant={"ghost"}
              aria-label="Cart"
              size={sm ? "md" : "md"}
              icon={<RiShoppingBag3Line fontSize={"1.2rem"} />}
              onClick={() => navigate("/mycart")}
            />{" "}
            {cartItems.length > 0 && (
              <Box
                pos="absolute"
                top={"25%"}
                right="25%"
                w=".5rem"
                h=".5rem"
                bg="red"
                rounded="full"
              />
            )}
          </Box>

          {/* check if user is logged in */}
          {userInfo && <UserAvatar handleLogout={handleLogout} />}
          {!userInfo && (
            <IconButton
              rounded={"lg"}
              variant="ghost"
              colorScheme="gray"
              aria-label="Account"
              size={sm ? "md" : "md"}
              icon={<RiUser2Line fontSize={"1.2rem"} color="gray.300" />}
              onClick={() => navigate("/login")}
            />
          )}
        </HStack>
      </Box>
    </>
  );
};

export default ShopNavbar;
