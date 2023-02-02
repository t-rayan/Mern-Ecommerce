import { Button } from "@chakra-ui/react";
import React from "react";

const AppButton = ({
  cScheme,
  size,
  children,
  height,
  bRadius,
  icon,
  onClick,
  ...props
}) => {
  return (
    <Button
      borderRadius={bRadius}
      colorScheme={cScheme}
      w={size}
      h={height}
      leftIcon={icon}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default AppButton;
