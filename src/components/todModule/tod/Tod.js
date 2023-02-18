import {
  Box,
  Button,
  Flex,
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
  Select,
  Stack,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { Edit, MinusCircle } from "react-feather";
import React, { useEffect, useState } from "react";

import Loader from "../../utilityComponents/loader/Loader.js";
import { LogoLink } from "../../../properties.js";
import { Search } from "react-feather";
import { fetchAllTitles } from "../../../api/index.js";
import { useNavigate } from "react-router-dom";

function Tod({ textColor }) {
  const token = localStorage.getItem("auth");
  const toast = useToast();
  const [profiles, setProfiles] = useState([
    { _id: 1 },
    { _id: 2 },
    { _id: 3 },
    { _id: 4 },
  ]);
  const [titles, setTitles] = useState([]);
  const [profileForDeletion, setProfileForDeletion] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterProps, setFilterProps] = useState({
    profileID: "",
    searchQuery: "",
    todTitle: "",
    status: "",
  });
  const navigate = useNavigate();

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
        setTitles(
          data?.data.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          })
        );
        console.log(data.data);
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
  const handleFetchAllProfiles = async () => {};
  const handleDeleteProfile = async () => {};
  const handleFilterData = async () => {};
  useEffect(() => {
    setIsLoading(true);
    handleFetchAllProfiles().then(() => {
      handleFetchAllTitles().then(() => {
        setIsLoading(false);
      });
    });
  }, []);
  useEffect(() => {
    console.log(filterProps);
  }, [filterProps]);
  return isLoading ? (
    <Loader />
  ) : (
    <Box w="100%" overflowX="hidden">
      <Stack w="100%" justifyContent="center" alignItems="center" mt={8}>
        <Image src={LogoLink} maxWidth="250px" height="auto" />
      </Stack>
      <Heading textAlign="center" mt={8} color={textColor}>
        All TOD Profiles
      </Heading>
      <Stack m="2" direction="row" justify="end">
        <Button
          variant="outline"
          colorScheme="red"
          bg="white"
          onClick={() => {
            return navigate("/tod/createProfile");
          }}
        >
          Add Profile
        </Button>
      </Stack>
      <Stack align="center" h="70vh">
        <Stack
          bg="secondary"
          p={5}
          zIndex={4}
          direction={["column", "column", "row"]}
          align="center"
          borderRadius="10px"
        >
          <Input
            w="56"
            bg="white"
            type="text"
            placeholder="Profile ID"
            onChange={(e) => {
              setFilterProps({ ...filterProps, profileID: e.target.value });
            }}
            focusBorderColor="#292929cf"
          />
          <Input
            w="56"
            bg="white"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setFilterProps({ ...filterProps, searchQuery: e.target.value });
            }}
            focusBorderColor="#292929cf"
          />
          <Select
            w="56"
            bg="white"
            placeholder="All TOD Titles"
            focusBorderColor="#292929cf"
            onChange={(e) => {
              setFilterProps({ ...filterProps, todTitle: e.target.value });
            }}
          >
            {titles.map((title) => {
              return (
                <option key={title._id} value={title.name}>
                  {title.name}
                </option>
              );
            })}
          </Select>
          <Select
            w="56"
            bg="white"
            placeholder="Both Status"
            focusBorderColor="#292929cf"
            onChange={(e) => {
              setFilterProps({ ...filterProps, status: e.target.value });
            }}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Select>
          <Box
            px={5}
            py={1}
            borderRadius="md"
            ml={3}
            // border="1px solid white"
            backgroundColor="#ED3237"
            cursor="pointer"
            transitionDuration="250ms"
            _hover={{
              transform: "scale(1.1)",
              boxShadow: "dark-lg",
            }}
          >
            <Search size="28" color="white" />
          </Box>
        </Stack>
        <Stack w={["50%", "50%", "95%"]}>
          <TableContainer mt={20} rounded="md" bgColor="white" maxW="100%">
            <Table variant="striped" colorScheme={"red"}>
              <Thead>
                <Tr>
                  <Th textAlign="center">Profile ID</Th>
                  <Th textAlign="center">Profile Title</Th>
                  <Th textAlign="center">Profile Domain</Th>
                  <Th textAlign="center">Primay Location</Th>
                  <Th textAlign="center">Enquiries</Th>
                  <Th textAlign="center">Status</Th>
                  <Th textAlign="center">Action</Th>
                </Tr>
              </Thead>
              <Tbody top={10}>
                {profiles?.map((profile) => {
                  return (
                    <Tr key={1} fontSize="sm">
                      <Td textAlign="center" isTruncated>
                        lfm;ds;l
                      </Td>
                      <Td textAlign="center" isTruncated>
                        lkdsnjkesbfkjbnef,nl,sdnflknskfmlkf
                      </Td>
                      <Td textAlign="center">
                        klsdsfjknklsdnflknskldfnklnfsldml
                      </Td>
                      <Td textAlign="center">
                        klsdsfjknklsdnflknskldfnklnfsldml
                      </Td>
                      <Td textAlign="center">
                        ;klsdsfjknklsdnflknskldfnklnfsldml
                      </Td>
                      <Td textAlign="center">
                        klsdsfjknklsdnflknskldfnklnfsldml
                      </Td>{" "}
                      <Td>
                        <Flex
                          spacing={5}
                          justifyContent="center"
                          gap={5}
                          align="center"
                          direction="row"
                        >
                          <Edit
                            className="domain-icon"
                            color="#e53e3f"
                            cursor="pointer"
                            height="20px"
                            onClick={() => {
                              return navigate(
                                `/tod/editProfile/${profile?._id}`
                              );
                            }}
                          />
                          <MinusCircle
                            className="domain-icon"
                            color="#e53e3f"
                            cursor="pointer"
                            height="20px"
                            onClick={() => {
                              setProfileForDeletion(profile);
                              setIsDeleteModalOpen(true);
                            }}
                          />
                          <Switch
                            isChecked={"active" === "active" ? true : false}
                            colorScheme="red"
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              This action will permanently delete profile{" "}
              <strong>{profileForDeletion?._id}</strong>.
            </Text>
            <Text>Do you still want to delete this profile?</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                handleDeleteProfile();
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
    </Box>
  );
}

export default Tod;
