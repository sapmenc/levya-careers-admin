import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { LogoLink } from "../../../properties.js";
import { signupUser } from "../../../api";
import { useNavigate } from "react-router-dom";

function CreateUser({ textColor }) {
  const toast = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState("active");
  const [showPassword, setShowPassword] = useState(false);

  const validateUserDetails = () => {
    if (!name) {
      toast({
        title: "User name required!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }
    if (!email) {
      toast({
        title: "User email required!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }
    if (!password) {
      toast({
        title: "User password required!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }
    if (!role) {
      toast({
        title: "User role required!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };
  const handleUserCreation = async (e) => {
    if (!validateUserDetails()) {
      return;
    }
    try {
      let body = {
        name: name,
        email: email,
        password: password,
        role: role,
        status: status,
      };
      console.log(body);
      const { data } = await signupUser(body);
      if (data.error) {
        return toast({
          title: "Error",
          description: "Error in creating user",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
      if (data.status) {
        toast({
          title: "User Created",
          description: "User has been created successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/users");
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="100%" overflowX="hidden">
      <Stack w="100%" justifyContent="center" alignItems="center" mt={8}>
        <Image src={LogoLink} maxWidth="250px" height="auto" />
      </Stack>
      <Heading textAlign="center" mt={8} color={textColor}>
        Create a user
      </Heading>
      <Stack m={5} p={5} spacing={5} align="center" w={"100%"}>
        <Input
          w="md"
          bg="white"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          focusBorderColor="#790202"
        />
        <Input
          w="md"
          bg="white"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          focusBorderColor="#790202"
        />
        <Flex flexDirection="column" gap="5px">
          <Input
            w="md"
            bg="white"
            type={`${showPassword === false ? "password" : "text"}`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            focusBorderColor="#790202"
          />
          <Button
            width="25%"
            alignSelf="flex-end"
            variant="outline"
            colorScheme="red"
            bg="white"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            _focus={{
              outline: "none",
            }}
          >
            {showPassword === false ? "show" : "hide"}
          </Button>
        </Flex>
        <Select
          placeholder="Role"
          w="md"
          bg="white"
          focusBorderColor="#790202"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Select>
        <Button
          onClick={handleUserCreation}
          _hover={{
            backgroundColor: "#790202",
            color: "white",
            boxShadow: "dark-lg",
          }}
        >
          Create User
        </Button>
      </Stack>
    </Box>
  );
}

export default CreateUser;
