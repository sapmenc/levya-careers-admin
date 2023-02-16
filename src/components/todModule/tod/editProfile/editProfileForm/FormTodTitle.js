import { FormControl, FormLabel, Select } from "@chakra-ui/react";

import React from "react";

function FormTodTitle({ setTodTitle }) {
  return (
    <FormControl isRequired>
      <FormLabel fontWeight="bold">Tod Title</FormLabel>
      <Select
        placeholder="Select option"
        focusBorderColor="#790202"
        onChange={(e) => {
          setTodTitle(e.target.value);
        }}
      >
        <option value="Frontend Developer">Frontend Developer</option>
        <option value="Backend Developer">Backend Developer</option>
        <option value="DevOps Engineer">DevOps Engineer</option>
      </Select>
    </FormControl>
  );
}

export default FormTodTitle;
