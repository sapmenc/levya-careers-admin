import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Text,
} from "@chakra-ui/react";
import { City, Country, State } from "country-state-city";

import { useState } from "react";

function FormPrimaryLocation({ primaryLocation, setPrimaryLocation }) {
  const countries = Country.getAllCountries();
  const states = State.getAllStates().sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  });
  const cities = City.getAllCities().sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const handleAdd = () => {
    setPrimaryLocation({
      country: selectedCountry?.name || "",
      state: selectedState?.name || "",
      ciity: selectedCity?.name || "",
    });
  };
  const formatLocation = (location) => {
    let data = [];
    if (location.country !== "") data.push(location.country);
    if (location.state !== "") data.push(location.state);
    if (location.city !== "") data.push(location.city);
    return data;
  };
  return (
    <FormControl isRequired>
      <Flex flexDir="column" gap={2}>
        <FormLabel fontWeight="bold">Primary Location [Max 1]</FormLabel>

        <Flex flexDir="column" gap={5} w="100%">
          <Flex gap={5} justifyContent="flex-start">
            <FormControl w="250px">
              <FormLabel>Select Country</FormLabel>
              <Select
                disabled={primaryLocation !== null}
                w="250px"
                focusBorderColor="#790202"
                onChange={(e) => {
                  setSelectedCity(null);
                  setSelectedState(null);
                  if (e.target.value === "") {
                    setSelectedCountry(null);
                    return;
                  }
                  let country = JSON.parse(e.target.value);
                  setSelectedCountry(country);
                }}
              >
                <option value="">-- Select Country --</option>
                {countries.map((country) => {
                  // state.isoCode === city.stateCode
                  return (
                    <option value={JSON.stringify(country)}>
                      {country.name}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            {selectedCountry && (
              <FormControl w="250px">
                <FormLabel>Select State</FormLabel>
                <Select
                  disabled={primaryLocation !== null}
                  w="250px"
                  focusBorderColor="#790202"
                  onChange={(e) => {
                    setSelectedCity(null);
                    if (e.target.value === "") {
                      setSelectedCity(null);
                      setSelectedState(null);
                      return;
                    }
                    let state = JSON.parse(e.target.value);
                    setSelectedState(state);
                  }}
                >
                  <option value="" selected>
                    -- Select State --
                  </option>
                  {states
                    .filter(
                      (state) => selectedCountry?.isoCode === state?.countryCode
                    )
                    .map((state) => {
                      // country.isoCode === state.countryCode
                      return (
                        <option value={JSON.stringify(state)}>
                          {state.name}
                        </option>
                      );
                    })}
                </Select>
              </FormControl>
            )}
            {selectedState && (
              <FormControl>
                <FormLabel>Select City</FormLabel>
                <Select
                  disabled={primaryLocation !== null}
                  w="250px"
                  focusBorderColor="#790202"
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setSelectedCity(null);
                      return;
                    }
                    let city = JSON.parse(e.target.value);
                    setSelectedCity(city);
                  }}
                >
                  <option value="" selected>
                    -- Select City --
                  </option>
                  {cities
                    .filter(
                      (city) =>
                        selectedCountry.isoCode === city.countryCode &&
                        selectedState.isoCode === city.stateCode
                    )
                    .map((city) => {
                      // country.isoCode === state.countryCode
                      return (
                        <option value={JSON.stringify(city)}>
                          {city.name}
                        </option>
                      );
                    })}
                </Select>
              </FormControl>
            )}
          </Flex>

          <Button
            onClick={handleAdd}
            variant="outline"
            colorScheme="red"
            bg="white"
            disabled={primaryLocation !== null || selectedCountry === null}
          >
            Add
          </Button>
        </Flex>
        {primaryLocation && (
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
            <Text fontWeight="bold">{formatLocation(primaryLocation)}</Text>

            <Text
              fontSize="lg"
              cursor="pointer"
              _hover={{
                fontWeight: "bold",
                transform: "scale(1.05)",
              }}
              onClick={() => {
                setPrimaryLocation(null);
              }}
            >
              ⓧ
            </Text>
          </Flex>
        )}
      </Flex>
    </FormControl>
  );
}

export default FormPrimaryLocation;
