import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Select,
  Stack,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Edit, MinusCircle } from "react-feather";
import React, { useState } from "react";

import { LogoLink } from "../../properties.js";
import { Search } from "react-feather";

function Tod({ textColor }) {
  const [result, setResult] = useState([1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 4]);
  const [domains, setDomains] = useState([]);

  return (
    <Box w="100%" overflowX="hidden">
      <Stack w="100%" justifyContent="center" alignItems="center" mt={8}>
        <Image src={LogoLink} maxWidth="250px" height="auto" />
      </Stack>
      <Heading textAlign="center" mt={8} color={textColor}>
        All TOD Profiles
      </Heading>
      <Stack m="2" direction="row" justify="end">
        <Button variant="outline" colorScheme="red" bg="white">
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
            focusBorderColor="#292929cf"
          />
          <Input
            w="56"
            bg="white"
            type="text"
            placeholder="Search"
            focusBorderColor="#292929cf"
          />
          <Select
            w="56"
            bg="white"
            placeholder="All"
            focusBorderColor="#292929cf"
          >
            {domains.map((domain) => {
              return (
                <option key={domain._id} value={domain.name}>
                  {domain.name}
                </option>
              );
            })}
          </Select>
          <Select
            w="56"
            bg="white"
            placeholder="Status"
            focusBorderColor="#292929cf"
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
                {result?.map((job) => {
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
                      {/* job.created_by*/}
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
                          />
                          <MinusCircle
                            className="domain-icon"
                            color="#e53e3f"
                            cursor="pointer"
                            height="20px"
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
    </Box>
  );
}

export default Tod;
