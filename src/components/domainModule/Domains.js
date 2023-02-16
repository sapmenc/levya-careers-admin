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
  ModalCloseButton,
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
import { addDomain, deleteDomain, fetchAllDomains } from "../../api";

import Domain from "./Domain";
import Loader from "../utilityComponents/loader/Loader.js";
import { LogoLink } from "../../properties.js";

function Domains({ textColor }) {
  let token = localStorage.getItem("auth");
  const toast = useToast();
  const [domains, setDomains] = useState([]);
  const [newDomain, setNewDomain] = useState("");
  const [domainId, setDomainId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    handleFetchAllDomains().then(() => {
      setIsLoading(false);
    });
  }, []);
  return isLoading ? (
    <Loader textColor={textColor} />
  ) : (
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
        <Image src={LogoLink} maxWidth="250px" height="auto" />
      </Stack>
      <Heading textAlign="center" mt={8} color={textColor}>
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
              focusBorderColor="#790202"
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
                <Domain
                  domain={domain}
                  key={index}
                  handleDeleteDomain={handleDeleteDomain}
                />
              ))}
          </Stack>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}

export default Domains;
