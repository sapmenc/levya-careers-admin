import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  Image,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  editUserProfile,
  fetchAllAppearance,
  fetchCurrentUser,
} from "../../api";

import Loader from "../utilityComponents/loader/Loader";
import { LogoLink } from "../../properties";

function Appearance({ textColor, setTextColor }) {
  const toast = useToast();
  const [appearances, setAppearances] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isTextLoading, setIsTextLoading] = useState(true);
  const token = localStorage.getItem("auth");

  const changeBackground = async (_id, image) => {
    document.getElementById("bg").style.backgroundImage = `url(${image})`;
    document.getElementById("bg").style.backgroundSize = "cover";
    // write change background in backend logic here
    try {
      const token = localStorage.getItem("auth");
      let body = {
        id: user?._id,
        appearance: _id,
      };
      const { data } = await editUserProfile(token, body);
      if (data.status) {
        return toast({
          title: "Success",
          description: "Theme changed successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (err) {}
  };
  const changeTextColor = async (color) => {
    if (textColor === color) {
      return;
    }
    setTextColor(color);
    try {
      const token = localStorage.getItem("auth");
      let body = {
        id: user?._id,
        textColor: color,
      };
      try {
        const { data } = await editUserProfile(token, body);
        if (data.status) {
          return toast({
            title: "Success",
            description: "Text color changed successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
      } catch (err) {
        console.log(err);
        return toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (err) {
      return toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  const resetAppearance = async () => {
    document.getElementById("bg").style.backgroundImage =
      "url(https://ik.imagekit.io/o0spphqdc/appearances/3433814_Jvyzikg8yy.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1675969906813)";
    document.getElementById("bg").style.backgroundSize = "cover";
    setTextColor("#000000");
    const _id = "63e545b172e82dd7bf4640df";
    try {
      const token = localStorage.getItem("auth");
      let body = {
        id: user?._id,
        appearance: _id,
        textColor: "#000000",
      };
      const { data } = await editUserProfile(token, body);
      if (data.status) {
        return toast({
          title: "Success",
          description: "Theme reset successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (err) {
      return toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
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
    setIsLoading(true);
    handleFetchAllAppearance()
      .then(() => {
        getCurrentUser();
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    if (textColor === "#ffffff" || textColor === "#000000") {
      setIsTextLoading(false);
    } else {
      setIsTextLoading(true);
    }
  }, [textColor]);

  return isLoading || isTextLoading ? (
    <Loader textColor={textColor} />
  ) : (
    <Box w="100%" overflowX="hidden">
      <Stack w="100%" justifyContent="center" alignItems="center" mt={8}>
        <Image src={LogoLink} maxWidth="250px" height="auto" />
      </Stack>
      <Heading textAlign="center" mt={8} color={textColor}>
        Appearance
      </Heading>
      <Stack mx={"10"} align="center" w="90%">
        <Flex w="100%" justifyContent="space-between">
          <Box>
            <Heading as="h2" size="md" color={textColor}>
              Select Background
            </Heading>
          </Box>
          <Flex gap="2rem">
            <Button
              size="md"
              backgroundColor="#828282"
              textColor="white"
              onClick={() => resetAppearance()}
            >
              Reset
            </Button>
          </Flex>
        </Flex>
        <Stack justify="center" w="90%" marginX={"auto"}>
          <SimpleGrid columns={4} spacing={5}>
            {appearances.map((item) => {
              if (item._id !== "63e545b172e82dd7bf4640df")
                return (
                  <GridItem key={item._id}>
                    <Image
                      onClick={() => changeBackground(item._id, item.image)}
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
            {(textColor === "#ffffff" || textColor === "#000000") && (
              <RadioGroup
                onChange={(color) => changeTextColor(color)}
                defaultValue={textColor}
              >
                <Stack spacing={10} direction="row">
                  <Radio colorScheme="red" value="#ffffff">
                    Light
                  </Radio>
                  <Radio colorScheme="red" value="#000000">
                    Dark
                  </Radio>
                </Stack>
              </RadioGroup>
            )}
          </Flex>
        </Flex>
      </Stack>
    </Box>
  );
}

export default Appearance;
