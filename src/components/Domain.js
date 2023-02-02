import React from "react";
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
function Domain({ domain, handleDeleteDomain }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            <Input focusBorderColor="#790202" />
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              colorScheme="red"
              bg="white"
              onClick={() => {
                // Edit Functionality Implementation

                onClose();
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
