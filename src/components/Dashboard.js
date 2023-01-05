import {
  Circle,
  Flex,
  Heading,
  Stack,
  useToast,
  Image,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { fetchAllJobs } from "../api";

function Dashboard() {
  let token = localStorage.getItem("auth");
  const [jobs, setJobs] = useState([]);
  const toast = useToast();
  const handleFetchAllJobs = async () => {
    try {
      const { data } = await fetchAllJobs(token);
      if (data.error) {
        toast({
          title: "Error",
          description: data.message,
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Success",
          description: data.message,
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        setJobs(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleFetchAllJobs();
  }, []);
  return (
    <Box w="100%" overflowX="hidden">
      <Stack w="100%" justifyContent="center" alignItems="center" mt={8}>
        <Image
          src="https://ik.imagekit.io/o0spphqdc/Ample_Logo_BOFaUuOQn.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671344685069"
          maxWidth="400px"
          height="auto"
        />
      </Stack>
      <Heading textAlign="center" mt={8}>
        Dashboard
      </Heading>
      <Flex w="100%" h="80vh" justifyContent="center" gap="100px" mt="70px">
        <Stack
          border="1px"
          h={"64"}
          pos="relative"
          w={"64"}
          align="center"
          justify="center"
        >
          <Circle
            color="white"
            shadow="lg"
            size={"32"}
            bgColor="secondary"
            pos="absolute"
            top="-16"
            fontWeight="bold"
            fontSize="5xl"
          >
            {jobs?.length}
          </Circle>
          <Heading>Job Posts</Heading>
        </Stack>
        <Stack
          border="1px"
          h={"64"}
          pos="relative"
          w={"64"}
          align="center"
          justify="center"
        >
          <Circle
            color="white"
            shadow="lg"
            size={"32"}
            bgColor="secondary"
            pos="absolute"
            top="-16"
            fontWeight="bold"
            fontSize="5xl"
          >
            5
          </Circle>
          <Heading>Applicants</Heading>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Dashboard;
