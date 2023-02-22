import { Box, Flex, Heading, Image, Stack } from "@chakra-ui/react";
import React, { useState } from "react";

import Form from "../TodForm/Form.js";
import Loader from "../../../utilityComponents/loader/Loader.js";
import { LogoLink } from "../../../../properties";

function TodEditProfile({ profileId }) {
  const [isLoading, setIsLoading] = useState(false);
  return isLoading ? (
    <Loader />
  ) : (
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
          Edit New Profile
        </Heading>
        <Form
          mode="edit"
          profileId={profileId || ""}
          setIsLoading={setIsLoading}
        />
      </Box>
    </Flex>
  );
}

export default TodEditProfile;
