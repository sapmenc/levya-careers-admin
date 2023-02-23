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
import React, { useEffect, useState } from "react";
import { editUserProfile, getUserById } from "../../../api";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../../utilityComponents/loader/Loader.js";
import { LogoLink } from "../../../properties.js";

function EditUser({ textColor }) {
  const param = useParams();
  const token = localStorage.getItem("auth");
  const toast = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState("active");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  const handleUserUpdation = async (e) => {
    if (!validateUserDetails()) {
      return;
    }
    try {
      let body = {
        id: param.id,
        name: name,
        email: email,
        role: role,
        status: status,
        password: password,
      };
      const { data } = await editUserProfile(token, body);
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
          title: "User Updated",
          description: "User has been updated successfully",
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

  const handleFetchCurrentUser = async () => {
    try {
      const data = await getUserById(token, param.id);
      if (data.status) {
        console.log(data);
        toast({
          title: "Success",
          description: "User details fetched successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        console.log(data?.data?.user);
        const user = data?.data?.user;
        setEmail(user?.email);
        setName(user?.name);
        setPassword(user?.password);
        setRole(user?.role);
        setStatus(user?.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    handleFetchCurrentUser().then(() => {
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <Loader textColor={textColor} />
  ) : (
    <Box w="100%" overflowX="hidden">
      <Stack w="100%" justifyContent="center" alignItems="center" mt={8}>
        <Image src={LogoLink} maxWidth="250px" height="auto" />
      </Stack>
      <Heading textAlign="center" mt={8} color={textColor}>
        Edit user
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            focusBorderColor="#ED3237"
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
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Select>
        <Button
          onClick={handleUserUpdation}
          _hover={{
            backgroundColor: "#790202",
            color: "white",
            boxShadow: "dark-lg",
          }}
        >
          Update
        </Button>
      </Stack>
    </Box>
  );
}

export default EditUser;
