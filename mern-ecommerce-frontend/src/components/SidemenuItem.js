import { Box, Flex, Grid, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { hideSidebar } from "../features/ui/uiSlice";
import useMedia from "../hooks/useMedia";

const SidemenuItem = ({ menuTitle, linkIcon, place }) => {
  const { isMobile, isTablet, isLargeDevice } = useMedia();
  const dispatch = useDispatch();
  const { isSidebar } = useSelector((state) => state.ui);

  return (
    <NavLink
      to={`${place}`}
      end
      onClick={() => isSidebar && isMobile && dispatch(hideSidebar())}
    >
      {({ isActive }) => (
        <Grid>
          <Flex
            alignItems="center"
            color={isActive ? "gray.700" : "gray.500"}
            _hover={{ color: "gray.700" }}
            fontSize={[".8rem", ".9rem", ".9rem"]}
            gap={3}
            mb={5}
          >
            <Icon as={linkIcon} w="18px" h="18px" />
            <Box>
              <Text fontWeight="medium">{menuTitle}</Text>
            </Box>
          </Flex>
        </Grid>
      )}
    </NavLink>
  );
};

export default SidemenuItem;
