import {
  Input,
  Stack,
  useToast,
  Button,
  Heading,
  Select,
  Box,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editUserProfile, getUserById } from "../../api";
import { LogoLink } from "../../properties.js";

function CreateUser() {
  const param = useParams();
  const token = localStorage.getItem("auth");
  const toast = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState("active");

  const handleUserUpdation = async (e) => {
    try {
      let body = {
        id: param.id,
        name: name,
        email: email,
        role: role,
        status: status,
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

  const handleFetchCurrentUser = async () => {
    try {
      const { data } = await getUserById(token, param.id);
      if (data.status) {
        toast({
          title: "Success",
          description: "User details fetched successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        console.log(data);
        setEmail(data.email);
        setName(data.name);
        setRole(data.role);
        setStatus(data.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchCurrentUser();
  }, []);

  return (
    <Box w="100%" overflowX="hidden">
      <Stack w="100%" justifyContent="center" alignItems="center" mt={8}>
        <Image src={LogoLink} maxWidth="250px" height="auto" />
      </Stack>
      <Heading textAlign="center" mt={8}>
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
        <Input
          w="md"
          bg="white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          focusBorderColor="#ED3237"
        />
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

export default CreateUser;
