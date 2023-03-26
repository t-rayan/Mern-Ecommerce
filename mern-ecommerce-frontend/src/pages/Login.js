import React from "react";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alertbox from "../components/Alertbox";
import { reset } from "../features/auth/authSlice";
import AuthLayout from "../layouts/AuthLayout";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, message, isSuccess, userInfo } = useSelector(
    (state) => state.auth
  );

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    dispatch(loginUser({ creds: data, navigate }));
  };

  useEffect(() => {
    if (userInfo && userInfo?.isAdmin) {
      navigate("/admin");
    } else if (userInfo) {
      navigate("/");
    }
  }, [isSuccess, userInfo, navigate]);

  return (
    <AuthLayout>
      {/* <Button variant={"link"} mb={5} onClick={() => navigate("/")}>
        Back to shop
      </Button> */}
      <Box textAlign={"center"}>
        <Button
          size={"lg"}
          colorScheme="blue"
          variant={"link"}
          mb={5}
          onClick={() => navigate("/")}
        >
          Tech-Hive
        </Button>
      </Box>

      <Box
        w="25rem"
        border="1px"
        borderColor="gray.300"
        borderRadius="lg"
        p="2rem 1rem"
        h="100%"
      >
        <VStack mb="3rem">
          <Heading size="md">Login to your account</Heading>
          <Flex gap={2}>
            <Text fontSize=".9rem">Don`t have an account ? </Text>
            <Link to="/register">
              <Text _hover={{ textDecoration: "underline" }} color="blue.600">
                Signup
              </Text>
            </Link>{" "}
          </Flex>
        </VStack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="2rem">
            <FormControl>
              <FormLabel color="gray.600" htmlFor="email">
                Email address
              </FormLabel>
              <Input
                _focusVisible={{ outlineOffset: "none" }}
                _focus={{ border: "2px", borderColor: "blue.400" }}
                borderColor="gray.300"
                type="email"
                {...register("email")}
                placeholder="Enter your email address"
                size="lg"
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray.600" htmlFor="password">
                Password
              </FormLabel>
              <Input
                _focusVisible={{ outlineOffset: "none" }}
                _focus={{ border: "2px", borderColor: "blue.400" }}
                size="lg"
                borderColor="gray.300"
                type="password"
                {...register("password")}
                placeholder="Enter your password"
              />
            </FormControl>
            {isError && <Alertbox msg={message} closeFunc={reset} />}
            <Button
              colorScheme="blue"
              size="lg"
              w="100%"
              type="submit"
              isLoading={isLoading}
              loadingText="Processing"
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </AuthLayout>
  );
};

export default Login;
