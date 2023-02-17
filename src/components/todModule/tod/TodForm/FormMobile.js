import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import React from "react";

function FormMobile({ mobile, setMobile }) {
  return (
    <FormControl isRequired>
      <FormLabel fontWeight="bold">Mobile No.</FormLabel>
      <Input
        bg="white"
        color="black"
        type="number"
        value={mobile}
        focusBorderColor="#790202"
        onChange={(e) => {
          setMobile(e.target.value);
        }}
      />
    </FormControl>
  );
}

export default FormMobile;
