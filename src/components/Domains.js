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
  useToast,
  CloseButton,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MinusCircle } from "react-feather";
import { addDomain, deleteDomain, fetchAllDomains } from "../api";

function Domains() {
  let token = localStorage.getItem("auth");
  const toast = useToast();
  const [domains, setDomains] = useState([]);
  const [newDomain, setNewDomain] = useState("");
  const [domainId, setDomainId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDeleteDomain = (id) => {
    setDomainId(id);
    onOpen();
  };
  const finalDeleteDomain = async () => {
    if (domainId === "") {
      return toast({
        title: "Error",
        description: "Domain ID not found",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    try {
      const { data } = await deleteDomain(token, domainId);
      if (data.error) {
        return toast({
          title: "Error",
          description: data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Success",
          description: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        handleFetchAllDomains();
        onClose();
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleFetchAllDomains = async () => {
    try {
      const { data } = await fetchAllDomains(token);
      if (data.error) {
        toast({
          title: "Error",
          description: data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Success",
          description: data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setDomains(data.data);
      }
    } catch (error) {
      return toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const handleAddDomain = async () => {
    if (newDomain === "") {
      return toast({
        title: "Error",
        description: "Please enter a domain",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    try {
      let body = {
        name: newDomain,
      };
      const { data } = await addDomain(body, token);
      if (data.error) {
        toast({
          title: "Error",
          description: data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Success",
          description: data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        handleResetDomain();
        handleFetchAllDomains();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const handleResetDomain = () => {
    setNewDomain("");
  };
  useEffect(() => {
    handleFetchAllDomains();
  }, []);
  return (
    <Box w="100%" overflowX="hidden">
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <CloseButton />
          </ModalHeader>
          <ModalBody>
            <Text>
              All jobs associated with this domain will get deleted !!
            </Text>
            <Text>Do you still want to delete this domain?</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => finalDeleteDomain()}
            >
              Delete
            </Button>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack w="100%" justifyContent="center" alignItems="center" mt={8}>
        <Image
          src="https://ik.imagekit.io/o0spphqdc/Ample_Logoround_DadwYn5xgI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671344685012"
          boxSize="32"
          alt=""
        />
      </Stack>
      <Heading textAlign="center" mt={8}>
        All Domains
      </Heading>
      <SimpleGrid m={2} p={2} w="100%" columns={2}>
        <GridItem w="50%" mx="auto">
          <Stack align={"end"} spacing={2}>
            <Input
              rounded="md"
              bg="white"
              type="text"
              value={newDomain}
              placeholder="New Domain Title"
              onChange={(e) => setNewDomain(e.target.value)}
              size="sm"
              focusBorderColor="#ED3237"
            />
            <Button
              onClick={() => handleAddDomain()}
              variant="outline"
              colorScheme="red"
              bg="white"
            >
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
            {domains.length > 0 &&
              domains?.map((domain, index) => (
                <Stack
                  px={4}
                  py={2}
                  bg="secondary"
                  w="100%"
                  justify="space-between"
                  key={index}
                  direction="row"
                  borderRadius="50px"
                >
                  <Text
                    flexGrow="1"
                    textTransform="capitalize"
                    color="white"
                    fontWeight="bold"
                  >
                    {domain.name}
                  </Text>
                  <MinusCircle
                    onClick={() => handleDeleteDomain(domain._id)}
                    color="white"
                    cursor="pointer"
                  />
                </Stack>
              ))}
          </Stack>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}

export default Domains;
