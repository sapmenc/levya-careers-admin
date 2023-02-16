import { Box, Flex, Heading } from "@chakra-ui/react";

import React from "react";

function NotFound({ textColor }) {
  return (
    <Box w="100%" overflowX="hidden" h="100%">
      <Flex flexDir="column" h="100%" justifyContent="center">
        <Heading textAlign="center" mt={8} color={textColor}>
          404 Not Found !
        </Heading>
      </Flex>
    </Box>
  );
}

export default NotFound;
