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
import { editUserProfile, fetchCurrentUser, signupUser } from "../../api";

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
      const { data } = await fetchCurrentUser(token);
      if (data.status) {
        toast({
          title: "Success",
          description: "Current user details fetched successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setEmail(data.data.email);
        setName(data.data.name);
        setRole(data.data.role);
        setStatus(data.data.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleFetchCurrentUser();
  }, [])

  return (
    <Box w="100%" overflowX="hidden">
      <Stack w="100%" justifyContent="center" alignItems="center" mt={8}>
        <Image
          src="https://ik.imagekit.io/o0spphqdc/Ample_Logo_BOFaUuOQn.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671344685069"
          maxWidth="250px"
          height="auto"
        />
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
          focusBorderColor="#ED3237"
        />
        <Input
          w="md"
          bg="white"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          focusBorderColor="#ED3237"
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
        <Select placeholder="Role" w="md" bg="white" focusBorderColor="#ED3237">
          <option value="option1">Admin</option>
          <option value="option2">User</option>
        </Select>
        <Button onClick={handleUserUpdation}>Update</Button>
      </Stack>
    </Box>
  );
}

export default CreateUser;
