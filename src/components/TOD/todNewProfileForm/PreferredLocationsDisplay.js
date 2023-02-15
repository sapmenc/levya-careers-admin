import { Flex, Text } from "@chakra-ui/react";

import React from "react";

const obj = [
  {
    country: "",
    state: "",
    city: "",
  },
  {
    country: "India",
    state: "Karnataka",
    city: "Bangalore",
  },
  {
    country: "India",
    state: "Karnataka",
    city: "Bangalore",
  },
];
function PreferredLocationsDisplay({
  preferredLocations,
  dispatchPreferredLocations,
}) {
  const handleRemove = (id) => {
    dispatchPreferredLocations({
      type: "REMOVE_LOCATION",
      id: id,
    });
  };
  return (
    <Flex flexDirection="column" gap={2}>
      {preferredLocations.map(({ id, locationData }) => {
        let data = [];
        if (locationData.country !== "") data.push(locationData.country);
        if (locationData.state !== "") data.push(locationData.state);
        if (locationData.city !== "") data.push(locationData.city);
        return (
          <Flex
            bg="red.300"
            color="white"
            gap={2}
            p={2}
            borderRadius={5}
            alignItems="center"
            w="300px"
            justifyContent="space-between"
          >
            <Text fontWeight="bold">{data.join(", ")}</Text>

            <Text
              fontSize="lg"
              cursor="pointer"
              _hover={{
                fontWeight: "bold",
                transform: "scale(1.05)",
              }}
              onClick={() => {
                handleRemove(id);
              }}
            >
              ⓧ
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
}

export default PreferredLocationsDisplay;
