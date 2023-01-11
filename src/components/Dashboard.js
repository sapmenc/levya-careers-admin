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
import { fetchAllJobs, fetchCurrentUser } from "../api";
import "./Dashboard.css";
import Typewriter from "typewriter-effect";
import Fade from "react-reveal/Fade";

function Dashboard() {
  let token = localStorage.getItem("auth");
  const [jobs, setJobs] = useState([]);
  const [welcomeName, setWelcomeName] = useState("Saransh Khulbe");
  const [flag, setFlag] = useState(0); //telling whether we got the welcome details or not
  const toast = useToast();
  const getCurrentUser = async () => {
    const { data } = await fetchCurrentUser(token);
    if (data.error) {
      window.location.href = "/login";
    }
    setWelcomeName(data.data.name);

    setFlag(1);
  };

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
    getCurrentUser();
    handleFetchAllJobs();
  }, []);
  return (
    <Box w="100%" overflowX="hidden">
      <Stack w="100%" justifyContent="center" alignItems="center" mt={8}>
        <Image
          src="https://ik.imagekit.io/o0spphqdc/Ample_Logo_BOFaUuOQn.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671344685069"
          maxWidth="250px"
          height="auto"
        />
      </Stack>

      {flag && (
        <div className="welcome-outer">
          <div className="welcome-inner">
            <Heading as="h2" size="xl" textAlign="center" mt={12}>
              Welcome{" "}
              <Typewriter
                className="welcome-name"
                onInit={(typewriter) => {
                  typewriter.typeString(`${welcomeName} !`).start();
                }}
              />
            </Heading>
            <Fade duration={1500} delay={218 * welcomeName.length}>
              <Heading
                as="h4"
                size="md"
                textAlign="center"
                mt={5}
                className="welcome-quote"
              >
                ❝The best preparation for good work tomorrow <br />
                is to do good work today.❞
              </Heading>
            </Fade>
          </div>
        </div>
      )}

      <Heading textAlign="center" mt={10}>
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
