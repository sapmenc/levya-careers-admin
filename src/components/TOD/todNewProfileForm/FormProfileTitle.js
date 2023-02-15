import { FormControl, FormLabel, Select } from "@chakra-ui/react";

import React from "react";

function FormProfileTitle({ setProfileTitle }) {
  return (
    <FormControl isRequired>
      <FormLabel fontWeight="bold">Profile Title</FormLabel>
      <Select
        placeholder="Select option"
        focusBorderColor="#790202"
        onChange={(e) => {
          setProfileTitle(e.target.value);
        }}
      >
        <option value="Frontend Developer">Frontend Developer</option>
        <option value="Backend Developer">Backend Developer</option>
        <option value="DevOps Engineer">DevOps Engineer</option>
      </Select>
    </FormControl>
  );
}

export default FormProfileTitle;
