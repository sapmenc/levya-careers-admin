import React, { useState } from "react";
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
import { MinusCircle } from "react-feather";
import { updateDomain } from "../api";
import { useNavigate } from "react-router-dom";
function Domain({ domain, handleDeleteDomain }) {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [domainName, setDomainName] = useState('')
  const handleUpdateDomain = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('auth')
      const id = domain._id
      let body = {
        name: domainName
      }
      const { data } = await updateDomain(token, id, body)
      if (data.status) {
        toast({
          title: "Domain Updated",
          description: "Domain has been updated successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onClose();
        //refresh the page
        window.location.reload()
      }
    }
    catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    }
  }
  return (
    <Stack
      px={4}
      py={2}
      bg="secondary"
      w="100%"
      justify="space-between"
      direction="row"
      borderRadius="50px"
      alignItems="center"
    >
      <Text
        flexGrow="1"
        textTransform="capitalize"
        color="white"
        fontWeight="bold"
      >
        {domain.name}
      </Text>
      <Button onClick={onOpen} variant="outline" colorScheme="red" bg="white">
        Edit
      </Button>

      <MinusCircle
        onClick={() => handleDeleteDomain(domain._id)}
        color="white"
        cursor="pointer"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Domain</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type='text'
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              focusBorderColor="#790202" />
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              colorScheme="red"
              bg="white"
              onClick={(e) => {
                // Edit Functionality Implementation
                handleUpdateDomain(e);
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
}

export default Domain;
