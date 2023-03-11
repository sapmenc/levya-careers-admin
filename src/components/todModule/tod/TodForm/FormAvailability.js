import { FormControl, FormLabel, Select } from "@chakra-ui/react";

import React from "react";

function FormAvailability({ availability, setAvailability }) {
  return (
    <FormControl isRequired>
      <FormLabel fontWeight="bold">Availability</FormLabel>
      <Select
        focusBorderColor="#790202"
        value={availability}
        onChange={(e) => {
          setAvailability(e.target.value);
        }}
      >
        <option value="Immediate">Immediate</option>
        <option value="15 days">15 days</option>
        <option value="30 days">30 days</option>
        <option value="60 days">60 days</option>
      </Select>
    </FormControl>
  );
}

export default FormAvailability;
