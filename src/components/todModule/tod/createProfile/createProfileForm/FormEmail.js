import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import React from "react";

function FormEmail({ setEmail }) {
  return (
    <FormControl isRequired>
      <FormLabel fontWeight="bold">Email</FormLabel>
      <Input
        bg="white"
        color="black"
        focusBorderColor="#790202"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
    </FormControl>
  );
}

export default FormEmail;
