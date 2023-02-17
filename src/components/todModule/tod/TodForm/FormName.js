import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import React from "react";

function FormName({ name, setName }) {
  return (
    <FormControl isRequired>
      <FormLabel fontWeight="bold">Candidate Name</FormLabel>
      <Input
        bg="white"
        color="black"
        focusBorderColor="#790202"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </FormControl>
  );
}

export default FormName;
