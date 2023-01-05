import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Button,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  useToast,
  CloseButton,
  Image,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

import bg1 from "../assets/backgrounds/t1.jpg";
import bg2 from "../assets/backgrounds/t2.jpg";
import bg3 from "../assets/backgrounds/t3.jpg";
import bg4 from "../assets/backgrounds/t4.jpg";
import bg5 from "../assets/backgrounds/t5.png";
import bg6 from "../assets/backgrounds/t6.jpg";
import bg7 from "../assets/backgrounds/t7.jpg";
import bg8 from "../assets/backgrounds/t8.jpg";
import { fetchAllAppearance } from "../api";

function Appearance() {
  const data = [
    {
      id: 1,
      image: bg1,
      alt: "bg1",
    },
    {
      id: 2,
      image: bg2,
      alt: "bg2",
    },
    {
      id: 3,
      image: bg3,
      alt: "bg3",
    },
    {
      id: 4,
      image: bg4,
      alt: "bg4",
    },
    {
      id: 5,
      image: bg5,
      alt: "bg5",
    },
    {
      id: 6,
      image: bg6,
      alt: "bg6",
    },
    {
      id: 7,
      image: bg7,
      alt: "bg7",
    },
    {
      id: 8,
      image: bg8,
      alt: "bg8",
    },
  ];
  const changeBackground = (id) => {
    let bg = document.getElementById("bg");
    bg.style.backgroundImage = `url(${data[id - 1].image})`;
    bg.style.backgroundSize = "cover";
  };
  const resetBackground = () => {
    let bg = document.getElementById("bg");
    console.log(bg);
    bg.style.backgroundImage = "none";
    bg.style.backgroundColor = "#e9ebf0";
  };
  const handleFetchAllAppearance = async () => {
    try {
      const { data } = await fetchAllAppearance();
    } catch (err) {}
  };
  useEffect(() => {}, []);
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
            {data.map((item) => {
              return (
                <GridItem key={item.id}>
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
            <RadioGroup defaultValue="dark" _focus="none">
              <Stack spacing={10} direction="row">
                <Radio colorScheme="red" value="light">
                  Light
                </Radio>
                <Radio colorScheme="red" value="dark">
                  Dark
                </Radio>
              </Stack>
            </RadioGroup>
          </Flex>
        </Flex>
      </Stack>
    </Box>
  );
}

export default Appearance;
