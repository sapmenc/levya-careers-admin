import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { City, Country, State } from "country-state-city";
import React, { useEffect, useRef, useState } from "react";
import {
  addJob,
  fetchAllDomains,
  fetchCurrentUser,
} from "../../../api/index.js";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Loader from "../../utilityComponents/loader/Loader.js";
import { LogoLink } from "../../../properties.js";
import { useNavigate } from "react-router-dom";

function CreateJob({ textColor }) {
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
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const editor = useRef(null);

  const capitalizeFirstLetter = (s) => {
    if (s === undefined) {
      return "";
    } else {
      let a = s?.split(" ");
      for (let i = 0; i < a?.length; i++) {
        a[i] = a[i][0]?.toUpperCase() + a[i]?.substring(1).toLowerCase();
      }
      let aResult = a.join(" ");
      return aResult;
    }
  };

  // to convert from "us_united states" to "UN_United States"
  const transformName = (str) => {
    let [ccode, s] = str.split("_");
    ccode = ccode.toUpperCase();

    let result = [ccode, capitalizeFirstLetter(s)].join("_");
    // console.log(result);
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!jobTitle || !jobDesc || !selectedDomain || !country || !state) {
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
        createdBy: userId,
      };
      const { data } = await addJob(body, token);

      if (data.status) {
        toast({
          title: "Job Created",
          description: "Job has been created successfully",
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
        toast({
          title: "Success",
          description: "Domains fetched successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setDomains(data.data);
      }
    } catch (error) {}
  };
  const handleFetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("auth");
      const { data } = await fetchCurrentUser(token);
      if (data.status) {
        // toast({
        //   title: "Success",
        //   description: "User details fetched successfully",
        //   status: "success",
        //   duration: 2000,
        //   isClosable: true,
        // });
        // console.log(data.password);
        // setEmail(data.email);
        // setName(data.name);
        // setPassword(data.password);
        // setRole(data.role);
        // setStatus(data.status);
        setUserId(data.data._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    handleFetchAllDomains()
      .then(() => {
        handleFetchCurrentUser();
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {}, [country, state, city]);

  return isLoading ? (
    <Loader textColor={textColor} />
  ) : (
    <Box w="100%" overflowX="hidden">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Stack align="center" maxW="70%" marginX="auto" spacing={10}>
            <Stack w="100%" justifyContent="center" alignItems="center" mt={8}>
              <Image src={LogoLink} maxWidth="250px" height="auto" />
            </Stack>
            <Heading textAlign="center" mt={8} color={textColor}>
              NEW JOB POST
            </Heading>
            <Input
              focusBorderColor="#790202"
              borderWidth={2}
              bg="white"
              type="text"
              placeholder="Job Title"
              w={"2xl"}
              onChange={(e) => setJobTitle(e.target.value)}
            />

            <CKEditor
              editor={ClassicEditor}
              data=""
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                // console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                // console.log({ event, editor, data });
                // console.log(typeof data);
                setJobDesc(editor.getData());
              }}
              onBlur={(event, editor) => {
                // console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                // console.log("Focus.", editor);
              }}
            />
            <Flex alignItems={"center"} mt="3" gap={2}>
              <Select
                focusBorderColor="#790202"
                borderWidth={2}
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
                focusBorderColor="#790202"
                borderWidth={2}
                bg="white"
                placeholder="Select Country"
                onChange={(e) => {
                  let country_code = e.target.value.split("_")[0];
                  let country = e.target.value.split("_")[1];
                  setCountry(transformName(country_code + "_" + country));
                  setCountryCode(country_code);
                }}
              >
                {Country.getAllCountries().map((country, i) => {
                  return (
                    <option
                      key={i}
                      value={country.isoCode + "_" + country.name}
                    >
                      {country.name}
                    </option>
                  );
                })}
              </Select>
              <Select
                focusBorderColor="#790202"
                borderWidth={2}
                bg="white"
                placeholder="Select State"
                onChange={(e) => {
                  let state_code = e.target.value.split("_")[0];
                  let state = e.target.value.split("_")[1];
                  console.log(state_code + "_" + state);
                  setState(transformName(state_code + "_" + state));
                  setStateCode(state_code);
                }}
              >
                {State.getStatesOfCountry(country_code).map((state, i) => (
                  <option key={i} value={state.isoCode + "_" + state.name}>
                    {state.name}
                  </option>
                ))}
              </Select>
              <Select
                focusBorderColor="#790202"
                borderWidth={2}
                bg="white"
                placeholder="Select City"
                value={city}
                onChange={(e) => setCity(capitalizeFirstLetter(e.target.value))}
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
                focusBorderColor="#790202"
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
                focusBorderColor="#790202"
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
                focusBorderColor="#790202"
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
                  backgroundColor: "#790202",
                  color: "white",
                  boxShadow: "dark-lg",
                }}
              >
                PUBLISH
              </Button>
            </Flex>
          </Stack>
        </FormControl>
      </form>
    </Box>
  );
}

export default CreateJob;
