import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  Flex,
  Image,
  Radio,
  RadioGroup,
  useToast,
} from "@chakra-ui/react";

import { editUserProfile, fetchAllAppearance, fetchCurrentUser } from "../api";
import { LogoLink } from "../properties";

function Appearance() {
  const toast = useToast();
  const [appearances, setAppearances] = useState([]);
  const [textColor, setTextColor] = useState("#000000");
  const [user, setUser] = useState({})
  const token = localStorage.getItem("auth");

  const changeBackground = async (id) => {
    try {
      let body = {
        id: user?._id,
        appearance: id
      }
      const token = localStorage.getItem("auth");
      const { data } = await editUserProfile(token, body);
      if (data.status) {
        return toast({
          title: "Success",
          description: "Background changed successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    }
    catch (err) {
      console.log(err);
      return toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const changeTextColor = async (color) => {
    try {
      const token = localStorage.getItem("auth");
      let body = {
        id: user?._id,
        textColor: color
      }
      console.log(body);
      try {
        const { data } = await editUserProfile(token, body);
        if (data.status) {
          return toast({
            title: "Success",
            description: "Text color changed successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    catch (err) {
      console.log(err);
      return toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }
  const resetBackground = () => {
  };
  const handleFetchAllAppearance = async () => {
    try {
      const token = localStorage.getItem("auth");
      const { data } = await fetchAllAppearance(token);
      if (data.error) {
        console.log(data.message);
      }
      setAppearances(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getCurrentUser = async () => {

    const { data } = await fetchCurrentUser(token);
    if (data.error) {
      window.location.href = "/login";
    }
    setUser(data.data);
  };
  useEffect(() => {
    handleFetchAllAppearance()
    getCurrentUser()
  }, []);
  return (
    <Box w="100%" overflowX="hidden">
      <Stack w="100%" justifyContent="center" alignItems="center" mt={8}>
        <Image src={LogoLink} maxWidth="250px" height="auto" />
      </Stack>
      <Heading textAlign="center" mt={8}>
        Appearance
      </Heading>
      <Stack mx={"10"} align="center" w="90%">
        <Flex w="100%" justifyContent="space-between">
          <Box>
            <Heading as="h2" size="md">
              Select Background
            </Heading>
          </Box>
          <Flex gap="2rem">
            <Button
              size="md"
              backgroundColor="#828282"
              textColor="white"
              onClick={() => resetBackground()}
            >
              Reset
            </Button>
          </Flex>
        </Flex>
        <Stack justify="center" w="90%" marginX={"auto"}>
          <SimpleGrid columns={4} spacing={5}>
            {appearances.map((item) => {
              return (
                <GridItem key={item._id}>
                  <Image
                    onClick={() => changeBackground(item.id)}
                    cursor={"pointer"}
                    borderRadius={"lg"}
                    src={item.image}
                    alt={item.alt}
                    w={"320px"}
                    h={"140px"}
                  />
                </GridItem>
              );
            })}
          </SimpleGrid>
        </Stack>
        <Flex
          w="350px"
          h="100px"
          bgColor="#d9d9d9"
          borderRadius="10px"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          p="17px"
          gap="15px"
        >
          <Flex>
            <Heading as="h5" size="sm">
              Text Color
            </Heading>
          </Flex>
          <Flex>
            <RadioGroup
              onChange={(color) => changeTextColor(color)}
              defaultValue="dark">
              <Stack spacing={10} direction="row">
                <Radio colorScheme="red" value="#ffffff">
                  Light
                </Radio>
                <Radio colorScheme="red" value="#000000">
                  Dark
                </Radio>
              </Stack>
            </RadioGroup>
          </Flex>
        </Flex>
      </Stack>
    </Box >
  );
}

export default Appearance;
