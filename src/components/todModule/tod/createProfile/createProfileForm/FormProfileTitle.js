import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import React from "react";

function FormProfileTitle({ setProfileTitle }) {
  return (
    <FormControl isRequired>
      <FormLabel fontWeight="bold">Profile Title</FormLabel>
      <Input
        bg="white"
        color="black"
        focusBorderColor="#790202"
        onChange={(e) => {
          setProfileTitle(e.target.value);
        }}
      />
    </FormControl>
  );
}

export default FormProfileTitle;
