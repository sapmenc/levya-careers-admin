import {
  Box,
  Select,
  Input,
  Textarea,
  Heading,
  Flex,
  Checkbox,
  Button,
  FormControl,
  useToast,
  Stack,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { fetchAllDomains, fetchJobById, updateJob } from "../../api";
import { useNavigate } from "react-router-dom";

function UpdateJob(props) {
  const { jid } = props;
  console.log(jid);
  const token = localStorage.getItem("auth");
  const toast = useToast();
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [domains, setDomains] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [remote, setRemote] = useState(false);
  const [state_code, setStateCode] = useState("");
  const [country_code, setCountryCode] = useState("");
  const [hybrid, setHybrid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !jobTitle ||
        !jobDesc ||
        !selectedDomain ||
        !country ||
        !state ||
        !city
      ) {
        return toast({
          title: "Error",
          description: "Please fill all the fields",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
      let body = {
        title: jobTitle,
        domain: selectedDomain,
        description: jobDesc,
        highPriority: urgent,
        remote: remote,
        hybrid: hybrid,
        city: city,
        state: state,
        state_code: state_code,
        country: country,
        country_code: country_code,
      };
      const { data } = await updateJob(body, token, jid);

      if (data.status) {
        toast({
          title: "Job Created",
          description: "Job has been updated successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/jobs");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const handleFetchAllDomains = async () => {
    try {
      const { data } = await fetchAllDomains(token);
      if (data.status) {
        setDomains(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCurrenJob = async () => {
    try {
      const { data } = await fetchJobById(token, jid.id);
      if (data.status) {
        toast({
          title: "Success",
          description: "Job details fetched successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        console.log(data.data);
        setCity(data.data.city);
        setCountry(data.data.country);
        setCountryCode(data.data.country_code);
        setJobDesc(data.data.description);
        setJobTitle(data.data.title);
        setRemote(data.data.remote);
        setUrgent(data.data.highPriority);
        setHybrid(data.data.hybrid);
        setState(data.data.state);
        setStateCode(data.data.state_code);
        setSelectedDomain(data.data.domain);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleFetchAllDomains();
    handleCurrenJob();
  }, []);
  useEffect(() => {}, [country, state, city]);

  return (
    <Box p="4" w="60%" justifyContent={"center"} mx="64">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Stack spacing={10}>
            <Stack w="100%" justifyContent="center" alignItems="center" mt={8}>
              <Image
                src="https://ik.imagekit.io/o0spphqdc/Ample_Logoround_DadwYn5xgI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671344685012"
                boxSize="32"
                alt=""
              />
            </Stack>
            <Heading textAlign="center" mt={8}>
              EDIT JOB POST
            </Heading>
            <Input
              focusBorderColor="#ED3237"
              borderWidth={2}
              value={jobTitle}
              bg="white"
              type="text"
              placeholder="Job Title"
              w={"2xl"}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <Textarea
              focusBorderColor="#ED3237"
              borderWidth={2}
              bg="white"
              cols={10}
              value={jobDesc}
              placeholder="Job Description"
              mt="3"
              onChange={(e) => setJobDesc(e.target.value)}
            />
            <Flex alignItems={"center"} mt="3" gap={2}>
              <Select
                focusBorderColor="#ED3237"
                borderWidth={2}
                value={selectedDomain}
                bg="white"
                placeholder="Select Domain"
                textTransform="capitalize"
                onChange={(e) => setSelectedDomain(e.target.value)}
              >
                {domains &&
                  domains.map((domain, i) => (
                    <option key={i} value={domain._id}>
                      {domain.name}
                    </option>
                  ))}
              </Select>
              <Select
                focusBorderColor="#ED3237"
                borderWidth={2}
                value={country}
                bg="white"
                placeholder="Select Country"
                onChange={(e) => {
                  let country_code = e.target.value.split("_")[0];
                  let country = e.target.value.split("_")[1];
                  setCountry(country);
                  setCountryCode(country_code);
                  console.log(country, country_code);
                }}
              >
                {Country.getAllCountries().map((country, i) => (
                  <option key={i} value={country.isoCode + "_" + country.name}>
                    {country.name}
                  </option>
                ))}
              </Select>
              <Select
                focusBorderColor="#ED3237"
                value={state}
                borderWidth={2}
                bg="white"
                placeholder="Select State"
                onChange={(e) => {
                  let state_code = e.target.value.split("_")[0];
                  let state = e.target.value.split("_")[1];
                  setState(state);
                  setStateCode(state_code);
                  console.log(state, state_code);
                }}
              >
                {State.getStatesOfCountry(country_code).map((state, i) => (
                  <option key={i} value={state.isoCode + "_" + state.name}>
                    {state.name}
                  </option>
                ))}
              </Select>
              <Select
                focusBorderColor="#ED3237"
                borderWidth={2}
                value={city}
                bg="white"
                placeholder="Select City"
                onChange={(e) => setCity(e.target.value)}
              >
                {City.getCitiesOfState(country_code, state_code).map(
                  (city, i) => (
                    <option key={i} value={city.name}>
                      {city.name}
                    </option>
                  )
                )}
              </Select>
            </Flex>
            <Flex mt="3" gap={5}>
              <Checkbox
                checked={urgent ? true : false}
                focusBorderColor="#ED3237"
                borderWidth={2}
                p={2}
                bg="white"
                onChange={(e) => setUrgent(e.target.checked)}
                borderRadius="9px"
                colorScheme="red"
              >
                Is Urgent Opening
              </Checkbox>
              <Checkbox
                checked={remote ? true : false}
                focusBorderColor="#ED3237"
                borderWidth={2}
                p={2}
                bg="white"
                onChange={(e) => setRemote(e.target.checked)}
                borderRadius="9px"
                colorScheme="red"
              >
                Is Remote
              </Checkbox>
              <Checkbox
                checked={hybrid ? true : false}
                focusBorderColor="#ED3237"
                borderWidth={2}
                p={2}
                bg="white"
                onChange={(e) => setHybrid(e.target.checked)}
                borderRadius="9px"
                colorScheme="red"
              >
                Is Hybrid
              </Checkbox>
            </Flex>

            <Flex>
              <Button
                color="black"
                border="1px solid black"
                transitionDuration="400ms"
                mx="auto"
                type="submit"
                w="xl"
                _hover={{
                  color: "white",
                  backgroundColor: "black",
                }}
              >
                UPDATE
              </Button>
            </Flex>
          </Stack>
        </FormControl>
      </form>
    </Box>
  );
}

export default UpdateJob;
