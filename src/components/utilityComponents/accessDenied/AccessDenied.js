import { Box, Heading, Image, Stack } from "@chakra-ui/react";

import { LogoLink } from "../../../properties";
import React from "react";

function AccessDenied({ textColor }) {
  return (
    <Box w="100%" overflowX="hidden" id="homepage-comp">
      <Stack w="100%" justifyContent="center" alignItems="center" mt={8}>
        <Image src={LogoLink} maxWidth="250px" height="auto" />
      </Stack>
      <Heading textAlign="center" mt={8} color={textColor}>
        Access Denied
      </Heading>
    </Box>
  );
}

export default AccessDenied;
