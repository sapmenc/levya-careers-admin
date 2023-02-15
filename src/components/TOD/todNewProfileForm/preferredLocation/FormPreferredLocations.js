import { City, Country, State } from "country-state-city";
import { Flex, FormControl, FormLabel, Select } from "@chakra-ui/react";

import PreferredLocationInput from "./PreferredLocationInput";
import PreferredLocationsDisplay from "./PreferredLocationsDisplay";

function FormPreferredLocations({
  preferredLocations,
  dispatchPreferredLocations,
}) {
  return (
    <FormControl isRequired>
      <Flex flexDir="column" gap={2}>
        <FormLabel fontWeight="bold">
          Preferred Locations [At Least 1, Max 3]
        </FormLabel>
        <Flex flexDir="column" gap={5}>
          {/* Input Location*/}
          <PreferredLocationInput
            preferredLocations={preferredLocations}
            dispatchPreferredLocations={dispatchPreferredLocations}
          />
          {/* Display Location*/}
          <PreferredLocationsDisplay
            preferredLocations={preferredLocations}
            dispatchPreferredLocations={dispatchPreferredLocations}
          />
        </Flex>
      </Flex>
    </FormControl>
  );
}

export default FormPreferredLocations;
