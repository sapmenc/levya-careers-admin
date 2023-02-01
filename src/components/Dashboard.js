import {
  Circle,
  Flex,
  Heading,
  Stack,
  useToast,
  Image,
  Box,
  IconButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { fetchAllJobs, fetchCurrentUser } from "../api";
import "./Dashboard.css";
import Typewriter from "typewriter-effect";
import Fade from "react-reveal/Fade";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { LogoLink } from "../properties.js";
import { useNavigate } from "react-router-dom";

function Dashboard({ textColor }) {
  let token = localStorage.getItem("auth");
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [welcomeName, setWelcomeName] = useState("Saransh Khulbe");
  const [flag, setFlag] = useState(0); //telling whether we got the welcome details or not
  const toast = useToast();
  const [user, setUser] = useState({});
  const getCurrentUser = async () => {
    const { data } = await fetchCurrentUser(token);

    if (data.error) {
      window.location.href = "/login";
    }
    setWelcomeName(data.data.name);

    setUser(data.data);
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
    <Box w="100%" overflowX="hidden" id="homepage-comp">
      <Stack w="100%" justifyContent="center" alignItems="center" mt={8}>
        <Image src={LogoLink} maxWidth="250px" height="auto" />
      </Stack>

      {flag && (
        <div className="welcome-outer">
          <div className="welcome-inner">
            <Heading
              as="h1"
              size="2xl"
              textAlign="center"
              mt={12}
              color={textColor}
            >
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
                as="h3"
                size="lg"
                textAlign="center"
                mt={5}
                className="welcome-quote"
                color={textColor}
              >
                ❝Never let success get to your head <br />
                and never let failure get to your heart.❞
              </Heading>
              <Heading
                as="h6"
                size="sm"
                textAlign="center"
                mt={5}
                className="welcome-quote"
                color={textColor}
              >
                <i>--Drake</i>
              </Heading>
            </Fade>
          </div>

          <div className="down-btn">
            <IconButton
              className="drop-btn-icon"
              variant="outline"
              colorScheme="red"
              fontSize="20px"
              icon={<ChevronDownIcon />}
              onClick={() => {
                let a = document.getElementById("homepage-comp");
                let d = document.getElementById("dashboard-comp");
                a.scrollTop = d.offsetTop - 50;
              }}
            />
          </div>
        </div>
      )}

      <Heading textAlign="center" mt={10} id="dashboard-comp" color={textColor}>
        Dashboard
      </Heading>
      <Flex w="100%" h="80vh" justifyContent="center" gap="100px" mt="100px">
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
            cursor="pointer"
            onClick={() => {
              return navigate("/jobs");
            }}
            _hover={{
              boxShadow: "dark-lg",
            }}
          >
            {jobs?.length}
          </Circle>
          <Heading color={textColor}>Job Posts</Heading>
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
            cursor="pointer"
            onClick={() => {
              return navigate("/jobs");
            }}
            _hover={{
              boxShadow: "dark-lg",
            }}
          >
            5
          </Circle>
          <Heading color={textColor}>Applicants</Heading>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Dashboard;
