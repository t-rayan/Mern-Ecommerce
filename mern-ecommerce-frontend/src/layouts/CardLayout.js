import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/react";
import React from "react";

const CardLayout = ({ title, children }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>

      <Divider borderColor={"gray.300"} />

      <CardBody>
        <Stack spacing={"5"}>{children}</Stack>
      </CardBody>
    </Card>
  );
};

export default CardLayout;
