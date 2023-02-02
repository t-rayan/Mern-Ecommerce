import React from "react";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../features/auth/authSlice";
import AuthLayout from "../layouts/AuthLayout";
import Alertbox from "../components/Alertbox";

const Register = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  }, [toast, isSuccess]);

  return (
    <AuthLayout>
      <Box
        w="28rem"
        border="1px"
        borderColor="gray.300"
        borderRadius="lg"
        p="3rem"
      >
        <VStack mb="3rem">
          <Heading size="md">Signup for new account</Heading>
          <Text fontSize=".9rem">
            Already have an account ?{" "}
            <Link to="/login" color="blue">
              Login
            </Link>{" "}
          </Text>
        </VStack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="2rem">
            <FormControl>
              <FormLabel htmlFor="firstname">Firstname</FormLabel>
              <Input
                borderColor="gray.300"
                type="text"
                {...register("firstname")}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lastname">Lastname</FormLabel>
              <Input
                borderColor="gray.300"
                type="text"
                {...register("lastname")}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                borderColor="gray.300"
                type="email"
                {...register("email")}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                borderColor="gray.300"
                type="password"
                {...register("password")}
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              size="md"
              w="100%"
              isLoading={isLoading}
              loadingText="Processing"
            >
              Signup
            </Button>
            {isError && <Alertbox msg={message} closeFunc={reset} />}
          </VStack>
        </form>
      </Box>
    </AuthLayout>
  );
};

export default Register;
