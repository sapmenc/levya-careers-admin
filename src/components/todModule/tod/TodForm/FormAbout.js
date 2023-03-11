import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";

import React from "react";

function FormAbout({ about, setAbout }) {
  return (
    <FormControl isRequired>
      <FormLabel fontWeight="bold">Profile Description</FormLabel>
      <Textarea
        value={about || ""}
        bg="white"
        color="black"
        focusBorderColor="#790202"
        onChange={(e) => {
          setAbout(e.target.value);
        }}
      />
    </FormControl>
  );
}

export default FormAbout;
