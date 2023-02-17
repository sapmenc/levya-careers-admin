import {
  Box,
  Button,
  CloseButton,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { deleteUser, fetchAllUsers, fetchCurrentUser } from "../../api";

import Loader from "../../components/utilityComponents/loader/Loader.js";
import { LogoLink } from "../../properties.js";
import { useNavigate } from "react-router-dom";

function UserContent({ textColor }) {
  let token = localStorage.getItem("auth");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteUser, setDeleteUser] = useState(null);

  const handleDeleteUser = (id) => {
    setUserId(id);
    onOpen();
  };
  const finalDeleteUser = async () => {
    if (userId === "") {
      return toast({
        title: "Error",
        description: "User Id not found",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    try {
      let body = {
        id: userId,
      };
      const { data } = await deleteUser(token, body);
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
        handleFetchAllUsers();
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
  const handleFetchAllUsers = async () => {
    try {
      const { data } = await fetchAllUsers(token);
      if (data.error) {
        toast({
          title: "Error",
          description: data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        setFetchedUsers(data.data);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const handleGetCurrentUser = async () => {
    try {
      const { data } = await fetchCurrentUser(token);
      if (data.error) {
        toast({
          title: "Error",
          description: data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        setCurrentUser(data.data);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    setIsLoading(true);
    handleFetchAllUsers().then(() => {
      handleGetCurrentUser().then(() => {
        setIsLoading(false);
      });
    });
  }, []);
  return isLoading ? (
    <Loader textColor={textColor} />
  ) : (
    <Box w="100%" overflowX="hidden">
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete User</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              setDeleteUser(null);
            }}
          />
          <ModalBody>
            <Text>
              All data associated with user{" "}
              <strong>{`${deleteUser?.name} (${deleteUser?._id})`}</strong> will
              get deleted !!
            </Text>
            <Text>Do you still want to delete this user?</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                finalDeleteUser();
                setDeleteUser(null);
              }}
            >
              Delete
            </Button>
            <Button
              mr={3}
              onClick={() => {
                onClose();
                setDeleteUser(null);
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack w="100%" justifyContent="center" alignItems="center" mt={8}>
        <Image src={LogoLink} maxWidth="250px" height="auto" />
      </Stack>
      <Heading textAlign="center" mt={8} color={textColor}>
        User Management
      </Heading>
      <Stack m="2" direction="row" justify="end">
        <Button
          onClick={() => {
            return navigate("/users/createuser");
          }}
          variant="outline"
          colorScheme="red"
          bg="white"
        >
          Add User
        </Button>
      </Stack>
      <Stack align="center" h="70vh" overflow={"auto"}>
        <Stack w={["50%", "50%", "95%"]}>
          <TableContainer mt={10} rounded="md" bgColor="white">
            <Table variant="striped" colorScheme={"red"}>
              <Thead>
                <Tr>
                  <Th>User Id</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Status</Th>
                  <Th>Role</Th>
                </Tr>
              </Thead>
              <Tbody>
                {fetchedUsers?.map((user) => {
                  return (
                    <Tr key={user._id}>
                      <Td>{user._id}</Td>
                      <Td>{user.name}</Td>
                      <Td>{user.email}</Td>
                      <Td>{user.status}</Td>
                      <Td>{user.role}</Td>
                      <Td>
                        <Stack spacing={5} align="center" direction="row">
                          <Button
                            onClick={() => {
                              return navigate(`/users/edituser/${user._id}`);
                            }}
                            bgColor="#790202"
                            color="white"
                            // disabled={currentUser?._id === user?._id}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => {
                              setDeleteUser(user);
                              handleDeleteUser(user._id);
                            }}
                            bgColor="#790202"
                            color="white"
                            disabled={currentUser?._id === user?._id}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
    </Box>
  );
}

export default UserContent;
