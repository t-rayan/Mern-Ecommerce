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
import useMedia from "../hooks/useMedia";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sm } = useMedia();
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
      <Box w={"100%"} h="100%">
        <VStack w={"100%"} mb="3rem">
          <Heading size="md">Login to your account</Heading>
          <Flex gap={2} alignItems="center">
            <Text fontSize=".9rem">Don`t have an account ? </Text>
            <Link to="/register">
              <Text
                textDecoration={"undeline"}
                _hover={{ textDecoration: "underline" }}
                color="blue.600"
              >
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
