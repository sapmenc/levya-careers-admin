import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Edit, MinusCircle } from "react-feather";
import React, { useState } from "react";
import { deleteTitle } from "../../../api";

function Title({ title }) {
  let token = localStorage.getItem("auth");
  const toast = useToast()
  const [titleName, setTitleName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteTitle = async () => {
    try {
      const id = title?._id;
      const { data } = await deleteTitle(token, id);
      if (data.error) {
        toast({
          title: "Error",
          description: "Error while deleting title",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Success",
          description: "Title deleted successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onClose();
      }
    }
    catch (err) {
      console.log(err);
      return toast({
        title: "Error",
        description: "Error while deleting title",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

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
        {title}
      </Text>
      <Flex gap="10px">
        <Edit
          className="domain-icon"
          onClick={onOpen}
          color="white"
          cursor="pointer"
          height="20px"
        />
        <MinusCircle
          className="domain-icon"
          onClick={() => handleDeleteTitle()}
          color="white"
          cursor="pointer"
          height="20px"
        />
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="text"
              value={titleName}
              onChange={(e) => setTitleName(e.target.value)}
              focusBorderColor="#790202"
            />
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              colorScheme="red"
              bg="white"
              onClick={(e) => {
                // Edit Functionality Implementation
                // handleUpdateTitle(e);
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

export default Title;
