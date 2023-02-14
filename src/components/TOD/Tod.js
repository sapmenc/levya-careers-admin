import { Box, Flex, Heading } from "@chakra-ui/react";

import Form from "./todNewProfileForm/Form";

function Tod() {
  return (
    <Flex
      w="100%"
      h="100vh"
      overflowX="hidden"
      justifyContent="center"
      bg="transparent"
      borderRadius={5}
      py={10}
    >
      <Box
        w="90%"
        h="100%"
        bg="white"
        p={10}
        borderRadius="lg"
        overflowX="hidden"
        overflowY="scroll"
      >
        <Heading textAlign="center" my={5}>
          Create New Profile
        </Heading>
        <Form />
      </Box>
    </Flex>
  );
}

export default Tod;
