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
import { deleteTitle, editTitle } from "../../../api";

function Title({ title, handleFetchAllTitles }) {
  let token = localStorage.getItem("auth");
  const toast = useToast();
  const [titleName, setTitleName] = useState(title.name);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditTitle = async () => {
    // try {
    //   const id = title?.id;
    //   let body = {
    //     name: titleName,
    //   };
    //   const { data } = await editTitle(token, id, body);
    //   if (data.error) {
    //     toast({
    //       title: "Error",
    //       description: "Error while editing title",
    //       status: "error",
    //       duration: 2000,
    //       isClosable: true,
    //     });
    //   } else {
    //     toast({
    //       title: "Success",
    //       description: "Title edited successfully",
    //       status: "success",
    //       duration: 2000,
    //       isClosable: true,
    //     });
    //     handleFetchAllTitles();
    //   }
    // } catch (err) {
    //   console.log(err);
    //   return toast({
    //     title: "Error",
    //     description: "Error while editing title",
    //     status: "error",
    //     duration: 2000,
    //     isClosable: true,
    //   });
    // }
  };
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
        handleFetchAllTitles();
      }
    } catch (err) {
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
        {title.name}
      </Text>
      <Flex gap="10px">
        <Edit
          className="domain-icon"
          onClick={() => setIsEditModalOpen(true)}
          color="white"
          cursor="pointer"
          height="20px"
        />
        <MinusCircle
          className="domain-icon"
          onClick={() => setIsDeleteModalOpen(true)}
          color="white"
          cursor="pointer"
          height="20px"
        />
      </Flex>
      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
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
                handleEditTitle();
                setIsEditModalOpen(false);
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              All profiles associated with the title{" "}
              <strong>{title.name}</strong> will get deleted !!
            </Text>
            <Text>Do you still want to delete this title?</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                handleDeleteTitle();
                setIsDeleteModalOpen(false);
              }}
            >
              Delete
            </Button>
            <Button mr={3} onClick={() => setIsDeleteModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
}

export default Title;
