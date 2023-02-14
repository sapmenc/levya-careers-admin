import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

function FormName({ setName }) {
  return (
    <FormControl isRequired>
      <FormLabel>Candidate Name</FormLabel>
      <Input
        bg="white"
        color="black"
        focusBorderColor="#790202"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </FormControl>
  );
}

export default FormName;
