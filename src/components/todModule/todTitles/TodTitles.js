import {
  Box,
  Button,
  CloseButton,
  GridItem,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { LogoLink } from "../../../properties.js";
import Title from "./Title.js";
import { createTitle, fetchAllTitles } from "../../../api/index.js";

function TodTitles({ textColor }) {
  const token = localStorage.getItem("auth");
  const [titles, setTitles] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  // const handleDeleteTitle = (id) => {
  //   setDomainId(id);
  //   onOpen();
  // };
  const handleAddTitle = async () => {
    try {
      let body = {
        name: 'new title'
      }
      if (!newTitle) {
        return toast({
          title: "Error",
          description: "Please enter title",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
      const { data } = await createTitle(token, { title: setNewTitle });
      console.log(data);
      if (data.error) {
        toast({
          title: "Error",
          description: "Error while creating title",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Success",
          description: "Title created successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setNewTitle("");
        handleFetchAllTitles();
      }
    } catch (error) {
      console.log(error);
      return toast({
        title: "Error",
        description: "error",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const toast = useToast();
  const handleFetchAllTitles = async () => {
    try {
      const { data } = await fetchAllTitles(token);
      console.log(data);
      if (data.error) {
        toast({
          title: "Error",
          description: "Error while fetching titles",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Success",
          description: "Titles fetched successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setTitles(data.data);
      }
    } catch (error) {
      console.log(error);
      return toast({
        title: "Error",
        description: "error",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    handleFetchAllTitles();
  }, [])

  return (
    <Box w="100%" overflowX="hidden">
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <CloseButton onClick={onClose} />
          </ModalHeader>
          <ModalBody>
            <Text>
              All jobs associated with this domain will get deleted !!
            </Text>
            <Text>Do you still want to delete this domain?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3}>
              Delete
            </Button>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack w="100%" justifyContent="center" alignItems="center" mt={8}>
        <Image src={LogoLink} maxWidth="250px" height="auto" />
      </Stack>
      <Heading textAlign="center" mt={8} color={textColor}>
        All TOD Titles
      </Heading>
      <SimpleGrid m={2} p={2} w="100%" columns={2}>
        <GridItem w="50%" mx="auto">
          <Stack align={"end"} spacing={2}>
            <Input
              rounded="md"
              bg="white"
              type="text"
              value={newTitle}
              placeholder="Add title"
              onChange={(e) => setNewTitle(e.target.value)}
              size="sm"
              focusBorderColor="#790202"
            />
            <Button variant="outline" colorScheme="red" bg="white">
              Add
            </Button>
          </Stack>
        </GridItem>
        <GridItem w="50%" mx="auto">
          <Stack
            bg="white"
            spacing={1}
            p={1}
            borderRadius="15px"
            border="1px solid gray"
          >
            {titles.length > 0 &&
              titles?.map((title, index) => (
                <Title
                  title={title}
                  key={index}
                />
              ))}
          </Stack>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}

export default TodTitles;
