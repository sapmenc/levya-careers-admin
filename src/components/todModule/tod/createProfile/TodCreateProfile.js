import { Box, Flex, Heading, Image, Stack } from "@chakra-ui/react";

import Form from "../TodForm/Form.js";
import { LogoLink } from "../../../../properties";

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
        <Stack w="100%" justifyContent="center" alignItems="center" mb={8}>
          <Image src={LogoLink} maxWidth="250px" height="auto" />
        </Stack>
        <Heading textAlign="center" my={5}>
          Create New Profile
        </Heading>
        <Form mode="create" />
      </Box>
    </Flex>
  );
}

export default Tod;
