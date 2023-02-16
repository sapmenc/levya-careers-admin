import "./Loader.css";

import { Box, Flex, Heading, Image, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { LogoLink } from "../../properties.js";

function Loader({ textColor }) {
  const loadText = ["Loading.", "Loading..", "Loading..."];
  const [count, setCount] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => (prevCount + 1) % 3);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <Box w="100%" overflowX="hidden" h="100%">
      <Flex
        flexDir="column"
        h="100%"
        justifyContent="center"
        className="loading"
      >
        <Stack w="100%" justifyContent="center" alignItems="center" mt={8}>
          <Image src={LogoLink} maxWidth="250px" height="auto" />
        </Stack>
        <Heading textAlign="center" mt={8} color={textColor}>
          {loadText[count]}
        </Heading>
      </Flex>
    </Box>
  );
}

export default Loader;
