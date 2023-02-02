import {
  Box,
  Button,
  Stack,
  Select,
  Heading,
  useToast,
  TableContainer,
  Td,
  Tr,
  Tbody,
  Th,
  Thead,
  Table,
  Input,
  Switch,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Search } from "react-feather";
import { useNavigate } from "react-router-dom";
import { fetchAllDomains, fetchAllJobs, updateJob } from "../api";
import Fuse from "fuse.js";
import { LogoLink } from "../properties.js";

function JobContent({ textColor }) {
  let token = localStorage.getItem("auth");
  const navigate = useNavigate();
  const toast = useToast();
  const [fetchedJobs, setFetchedJobs] = useState([]);
  const [resultJobs, setResultJobs] = useState([]);
  const [domains, setDomains] = useState([]);
  const [isSelectedActive, setIsSelectedActive] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDomain, setSearchDomain] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [jobId, setJobId] = useState("");

  const capitalizeFirstLetter = (s) => {
    if (s === undefined) {
      return "";
    } else {
      let a = s?.split(" ");
      for (let i = 0; i < a?.length; i++) {
        a[i] = a[i][0]?.toUpperCase() + a[i]?.substring(1).toLowerCase();
      }
      let aResult = a.join(" ");
      return aResult;
    }
  };
  const getPlaceName = (str) => {
    let [ccode, s] = str.split("_");
    s = capitalizeFirstLetter(s);
    return s;
  };

  const handleUpdateJobStatus = async (id, status) => {
    setLoading(true);
    try {
      let body = {
        status: status,
      };
      const { data } = await updateJob(body, token, id);
      if (data.error) {
        return toast({
          title: "Error",
          description: data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
      toast({
        title: "Success",
        description: data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      handleFetchAllJobs();
    } catch (err) {
      return toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
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
        setDomains(data.data);
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
  const handleFetchAllJobs = async () => {
    try {
      const { data } = await fetchAllJobs(token);
      if (data.error) {
        return toast({
          title: "Error",
          description: data.error,
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
        setFetchedJobs(data.data);
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
  const options = {
    includeScore: true,
    keys: ["title", "domain.name", "country", "state", "city", "_id"],
  };
  const fuse = new Fuse(fetchedJobs, options);

  const searchWithFuse = (query) => {
    if (jobId.length > 0) {
      let res = [];
      res = fetchedJobs.filter((job) => job._id === jobId);
      return res;
    }
    //destructure query to get searchQuery, searchDomain, searchStatus
    const { searchQuery, searchDomain, searchStatus } = query;
    let result = fuse.search(searchQuery);
    if (searchDomain) {
      result = result.filter((job) => job.item.domain.name === searchDomain);
    }
    if (searchStatus) {
      result = result.filter((job) => job.item.status === searchStatus);
    }
    return result.map((job) => job.item);
  };
  const handleSearchFilterForDomain = (e) => {
    let r = fetchedJobs.filter((job) => job.domain.name === e.target.value);
    setResultJobs(r);
  };
  const handleSearchFilterForStatus = (e) => {
    let r = fetchedJobs.filter((job) => job.status === e.target.value);
    setResultJobs(r);
  };
  useEffect(() => {
    handleFetchAllJobs();
    handleFetchAllDomains();
  }, [resultJobs]);
  return (
    <Box w="100%" overflowX="hidden">
      <Stack w="100%" justifyContent="center" alignItems="center" mt={8}>
        <Image src={LogoLink} maxWidth="250px" height="auto" />
      </Stack>
      <Heading textAlign="center" mt={8} color={textColor}>
        All Job Posts
      </Heading>
      <Stack m="2" direction="row" justify="end">
        <Button
          onClick={() => {
            return navigate("/createjob");
          }}
          variant="outline"
          colorScheme="red"
          bg="white"
        >
          Add Job
        </Button>
      </Stack>
      <Stack align="center" h="70vh" overflow={"auto"}>
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
            onChange={(e) => {
              setJobId(e.target.value);
            }}
            value={jobId}
            placeholder="job id"
            focusBorderColor="#292929cf"
          />
          <Input
            w="56"
            bg="white"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            value={searchQuery}
            focusBorderColor="#292929cf"
          />
          <Select
            w="56"
            bg="white"
            placeholder="All"
            focusBorderColor="#292929cf"
            onChange={(e) => {
              handleSearchFilterForDomain(e);
            }}
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
            onChange={(e) => {
              handleSearchFilterForStatus(e);
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
            <Search
              size="28"
              color="white"
              onClick={() => {
                if (!searchQuery && !jobId) {
                  return toast({
                    title: "Error",
                    description: "Please enter a search query",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                } else {
                  setResultJobs(
                    searchWithFuse({ searchQuery, searchDomain, searchStatus })
                  );
                }
              }}
            />
          </Box>
        </Stack>
        <Stack w={["50%", "50%", "95%"]}>
          <TableContainer mt={20} rounded="md" bgColor="white">
            <Table variant="striped" colorScheme={"red"}>
              <Thead>
                <Tr>
                  <Th>Job ID</Th>
                  <Th>Job Title</Th>
                  <Th>Job Domain</Th>
                  <Th>Job Location</Th>
                  <Th>Job Applicants</Th>
                  <Th>Created By</Th>
                  <Th>Job Status</Th>
                  <Th>Job Action</Th>
                </Tr>
              </Thead>
              <Tbody top={10}>
                {resultJobs.length > 0
                  ? resultJobs?.map((job) => {
                      return (
                        <Tr key={job._id} fontSize="sm">
                          <Td>{job._id}</Td>
                          <Td>{job.title}</Td>
                          <Td>{capitalizeFirstLetter(job.domain.name)}</Td>
                          <Td>
                            {getPlaceName(job.state) +
                              ", " +
                              getPlaceName(job.country)}
                          </Td>
                          <Td>{55}</Td>
                          <Td>Keyur Shinde</Td> {/* job.created_by*/}
                          <Td>{capitalizeFirstLetter(job.status)}</Td>
                          <Td>
                            <Stack spacing={5} align="center" direction="row">
                              <Button
                                onClick={() => {
                                  return navigate(`/editjob/${job._id}`);
                                }}
                                bgColor="secondary"
                                color="white"
                              >
                                Edit
                              </Button>
                              <Switch
                                disabled={loading}
                                isChecked={
                                  job.status === "active" ? true : false
                                }
                                onChange={() => {
                                  if (job.status === "active") {
                                    handleUpdateJobStatus(job._id, "inactive");
                                  } else {
                                    handleUpdateJobStatus(job._id, "active");
                                  }
                                }}
                                colorScheme="red"
                              />
                            </Stack>
                          </Td>
                        </Tr>
                      );
                    })
                  : fetchedJobs?.map((job) => {
                      return (
                        <Tr key={job._id} fontSize="sm">
                          <Td>{job._id}</Td>
                          <Td>{job.title.toUpperCase()}</Td>
                          <Td>{capitalizeFirstLetter(job.domain?.name)}</Td>
                          <Td>
                            {getPlaceName(job.state) +
                              ", " +
                              getPlaceName(job.country)}
                          </Td>
                          <Td>{55}</Td>
                          <Td>Keyur Shinde</Td> {/* job.created_by*/}
                          <Td>{capitalizeFirstLetter(job.status)}</Td>
                          <Td>
                            <Stack spacing={3} align="center" direction="row">
                              <Button
                                onClick={() => {
                                  return navigate(`/editjob/${job._id}`);
                                }}
                                bgColor="secondary"
                                color="white"
                              >
                                Edit
                              </Button>
                              <Switch
                                disabled={loading}
                                isChecked={
                                  job.status === "active" ? true : false
                                }
                                onChange={() => {
                                  if (job.status === "active") {
                                    handleUpdateJobStatus(job._id, "inactive");
                                  } else {
                                    handleUpdateJobStatus(job._id, "active");
                                  }
                                }}
                                colorScheme="red"
                              />
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

export default JobContent;
