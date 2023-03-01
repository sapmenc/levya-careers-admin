import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import React from "react";

function FormProfileTitle({ profileTitle, setProfileTitle }) {
  return (
    <FormControl isRequired>
      <FormLabel fontWeight="bold">Designation</FormLabel>
      <Input
        bg="white"
        color="black"
        focusBorderColor="#790202"
        value={profileTitle}
        onChange={(e) => {
          setProfileTitle(e.target.value);
        }}
      />
    </FormControl>
  );
}

export default FormProfileTitle;
