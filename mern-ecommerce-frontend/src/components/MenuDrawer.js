import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../features/ui/uiSlice";
import AdminSideMenu from "./AdminSideMenu";
import UserSideMenu from "./UserSideMenu";

const MenuDrawer = ({ onOpen }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const { isSidebar } = useSelector((state) => state.ui);

  return (
    <>
      <Drawer
        isOpen={isSidebar}
        placement="left"
        onClose={() => dispatch(toggleSidebar())}
      >
        <DrawerOverlay />
        <DrawerContent maxW={"280px"} bg="orange.50">
          {/* <DrawerCloseButton /> */}

          <DrawerBody width={"100%"} p={0}>
            {userInfo?.isAdmin ? <AdminSideMenu /> : <UserSideMenu />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MenuDrawer;
