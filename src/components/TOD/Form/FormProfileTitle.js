import React from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";

function FormProfileTitle({ setProfileTitle }) {
  return (
    <FormControl isRequired>
      <FormLabel>Profile Title</FormLabel>
      <Select
        placeholder="Select option"
        focusBorderColor="#790202"
        onChange={(e) => {
          setProfileTitle(e.target.value);
        }}
      >
        <option value="option1">Frontend Developer</option>
        <option value="option2">Backend Developer</option>
        <option value="option3">DevOps Engineer</option>
      </Select>
    </FormControl>
  );
}

export default FormProfileTitle;
