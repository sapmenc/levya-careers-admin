import { Button, Flex, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { City, Country, State } from "country-state-city";

import { useState } from "react";

function PreferredLocationInput({
  preferredLocations,
  dispatchPreferredLocations,
}) {
  function show() {
    let obj = {
      country: selectedCountry?.name,
      state: selectedState?.name,
      city: selectedCity?.name,
    };
    console.log(obj);
  }
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
    dispatchPreferredLocations({
      type: "ADD_LOCATION",
      locationData: {
        country: selectedCountry?.name || "",
        state: selectedState?.name || "",
        city: selectedCity?.name || "",
      },
    });
  };
  return (
    <Flex flexDir="column" gap={5} w="100%">
      <Flex gap={5} justifyContent="flex-start">
        <FormControl w="250px">
          <FormLabel>Select Country</FormLabel>
          <Select
            disabled={preferredLocations?.length >= 3}
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
              show();
            }}
          >
            <option value="">-- Select Country --</option>
            {countries.map((country) => {
              // state.isoCode === city.stateCode
              return (
                <option value={JSON.stringify(country)}>{country.name}</option>
              );
            })}
          </Select>
        </FormControl>
        {selectedCountry && (
          <FormControl w="250px">
            <FormLabel>Select State</FormLabel>
            <Select
              disabled={preferredLocations?.length >= 3}
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
                show();
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
                    <option value={JSON.stringify(state)}>{state.name}</option>
                  );
                })}
            </Select>
          </FormControl>
        )}
        {selectedState && (
          <FormControl>
            <FormLabel>Select City</FormLabel>
            <Select
              disabled={preferredLocations?.length >= 3}
              w="250px"
              focusBorderColor="#790202"
              onChange={(e) => {
                if (e.target.value === "") {
                  setSelectedCity(null);
                  return;
                }
                let city = JSON.parse(e.target.value);
                setSelectedCity(city);
                show();
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
                    <option value={JSON.stringify(city)}>{city.name}</option>
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
        disabled={preferredLocations?.length >= 3 || !selectedCountry}
      >
        {preferredLocations?.length >= 3 ? "Max Limit reached" : "Add"}
      </Button>
    </Flex>
  );
}

export default PreferredLocationInput;
