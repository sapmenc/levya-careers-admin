import React, { useState, useReducer } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Checkbox,
  FormLabel,
  Textarea,
  Heading,
  useToast,
  Select,
  Text,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import {
  defaultExperience,
  defaultEducation,
  defaultPreferredLocations,
  experiencesReducer,
  educationReducer,
  preferredLocationsReducer,
} from "./todUtilities";
import { Country, State, City } from "country-state-city";
import moment from "moment";
import { transform } from "framer-motion";

function Tod() {
  const [experiences, dispatchExperience] = useReducer(experiencesReducer, [
    defaultExperience,
  ]);
  const [education, dispatchEducation] = useReducer(educationReducer, [
    defaultEducation,
  ]);
  const [preferredLocations, dispatchPreferredLocations] = useReducer(
    preferredLocationsReducer,
    defaultPreferredLocations
  );

  const toast = useToast();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState(new Set([]));
  const [currSkill, setCurrSkill] = useState("");

  const handleSubmit = () => {
    console.log("submitted");
  };
  console.log(Country.getAllCountries());

  return (
    <Flex
      w="100%"
      overflowX="hidden"
      justifyContent="center"
      bg="white"
      m={10}
      borderRadius={5}
      py={10}
    >
      <Box w="90%" h="100%" bg="white" p={5}>
        <Heading textAlign="center" my={5}>
          New Profile
        </Heading>
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" gap={5} mb={10}>
            <FormControl isRequired>
              <FormLabel>Candidate Name</FormLabel>
              <Input bg="white" color="black" focusBorderColor="#790202" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Candidate Name</FormLabel>
              <Select placeholder="Select option" focusBorderColor="#790202">
                <option value="option1">Frontend Developer</option>
                <option value="option2">Backend Developer</option>
                <option value="option3">DevOps Engineer</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Also skilled at [Max 2] </FormLabel>
              <Flex gap={2}>
                <Input
                  value={currSkill || ""}
                  isDisabled={skills.size >= 2}
                  placeholder={skills.size >= 2 ? "Max limit reached" : ""}
                  bg="white"
                  color="black"
                  focusBorderColor="#790202"
                  onChange={(e) => {
                    setCurrSkill(e.target.value);
                  }}
                />
                <Button
                  isDisabled={currSkill === ""}
                  onClick={() => {
                    let tempSet = new Set([...skills]);
                    tempSet.add(currSkill);
                    setCurrSkill("");
                    setSkills(tempSet);
                  }}
                >
                  + Add Skill
                </Button>
              </Flex>
              <Flex gap={2} mt={3}>
                {Array.from(skills).map((skill) => {
                  return (
                    <Flex
                      bg="red.300"
                      color="white"
                      gap={2}
                      p={2}
                      borderRadius={5}
                      alignItems="center"
                    >
                      <Text fontWeight="bold">{skill}</Text>

                      <Text
                        fontSize="lg"
                        cursor="pointer"
                        onClick={() => {
                          let tempSet = new Set([...skills]);
                          tempSet.delete(skill);
                          setSkills(tempSet);
                        }}
                        _hover={{
                          fontWeight: "bold",
                          transform: "scale(1.05)",
                        }}
                      >
                        ⓧ
                      </Text>
                    </Flex>
                  );
                })}
              </Flex>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Preferred Location</FormLabel>
              {/* <Box>
                {preferredLocations.map((location, i) => {
                  const { country, state, city } = location;
                  const countries = Country.getAllCountries();
                  const states = country ? State.getAllStates() : [];
                  const cities = state ? City.getAllCities() : [];

                  return (
                    <Box key={i} mt={4}>
                      <FormControl>
                        <FormLabel>Country</FormLabel>
                        <Select
                          //   value={}
                          onChange={(e) => {
                            // defaultPreferredLocations({
                            //   type: "UPDATE_LOCATION",
                            //   index: i,
                            //   field: "country",
                            //   payload: e.target.value,
                            // })
                          }}
                        >
                          <option value="">Select a country</option>
                          {countries.map((c) => (
                            <option key={c.id} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                      {country && (
                        <FormControl mt={4}>
                          <FormLabel>State</FormLabel>
                          <Select
                            value={state}
                            onChange={(e) => {
                              //   defaultPreferredLocations({
                              //     type: "UPDATE_LOCATION",
                              //     index: i,
                              //     field: "state",
                              //     payload: e.target.value,
                              //   })
                            }}
                          >
                            <option value="">Select a state</option>
                            {states.map((s) => (
                              <option key={s.id} value={s.name}>
                                {s.name}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                      {state && (
                        <FormControl mt={4}>
                          <FormLabel>City</FormLabel>
                          <Select
                            value={city}
                            onChange={(e) => {
                              //   dispatchPreferredLocations({
                              //     type: "UPDATE_LOCATION",
                              //     index: i,
                              //     field: "city",
                              //     payload: e.target.value,
                              //   })
                            }}
                          >
                            <option value="">Select a city</option>
                            {cities.map((c) => (
                              <option key={c.id}>{c.name}</option>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Box>
                  );
                })}
                <Button
                  mt={4}
                  onClick={() =>
                    dispatchPreferredLocations({ type: "ADD_LOCATION" })
                  }
                >
                  Add Location
                </Button>
              </Box> */}
            </FormControl>
          </Flex>
          <Tabs variant="soft-rounded" colorScheme="red">
            <TabList display="flex" justifyContent="center">
              <Tab>Experience</Tab>
              <Tab>Education</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {/* Experience */}
                <Box>
                  <Heading as="h3" size="lg" mb={5}>
                    Experience
                  </Heading>
                  {experiences.map((experience, index) => (
                    <Box
                      key={experience.id}
                      mb={4}
                      bg="gray.200"
                      p={5}
                      borderRadius={10}
                      overflow="hidden"
                    >
                      <Heading as="h4" size="md" mb={5}>
                        Experience {index + 1}
                      </Heading>
                      <Flex flexDirection="column" gap={3}>
                        <FormControl isRequired>
                          <FormLabel>Company Name</FormLabel>
                          <Input
                            value={experience.companyName || ""}
                            bg="white"
                            color="black"
                            focusBorderColor="#790202"
                            onChange={(e) => {
                              dispatchExperience({
                                type: "UPDATE_EXPERIENCE",
                                payload: {
                                  id: experience.id,
                                  updates: { companyName: e.target.value },
                                },
                              });
                              //   console.log(experience);
                            }}
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>Position</FormLabel>
                          <Input
                            value={experience.position || ""}
                            bg="white"
                            color="black"
                            focusBorderColor="#790202"
                            onChange={(e) => {
                              dispatchExperience({
                                type: "UPDATE_EXPERIENCE",
                                payload: {
                                  id: experience.id,
                                  updates: { position: e.target.value },
                                },
                              });
                              //   console.log(experience);
                            }}
                          />
                        </FormControl>

                        <FormControl>
                          <Flex alignItems="center">
                            <FormLabel>Currently Working</FormLabel>
                            <Checkbox
                              isChecked={experience.isCurrentlyWorking || false}
                              outline="none"
                              border="none"
                              borderRadius={2}
                              colorScheme="red"
                              bg="white"
                              focusBorderColor="#790202"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  dispatchExperience({
                                    type: "UPDATE_EXPERIENCE",
                                    payload: {
                                      id: experience.id,
                                      updates: {
                                        isCurrentlyWorking: e.target.checked,
                                        endDate: "",
                                      },
                                    },
                                  });
                                } else {
                                  dispatchExperience({
                                    type: "UPDATE_EXPERIENCE",
                                    payload: {
                                      id: experience.id,
                                      updates: {
                                        isCurrentlyWorking: e.target.checked,
                                        endDate: moment().format("YYYY-MM-DD"),
                                      },
                                    },
                                  });
                                }

                                console.log(e.target.checked);
                              }}
                            />
                          </Flex>
                          <Flex gap={2} justifyContent="flex-start">
                            <FormControl isRequired>
                              <FormLabel>Start Date</FormLabel>
                              <Input
                                // value={}
                                bg="white"
                                color="black"
                                focusBorderColor="#790202"
                                type="date"
                                maxW="sm"
                                onChange={(e) => {
                                  if (
                                    moment().format("YYYY-MM-DD") <
                                      e.target.value ||
                                    (experience.endDate !== "" &&
                                      e.target.value > experience.endDate)
                                  ) {
                                    toast({
                                      title: "Error",
                                      description: "Enter a valid start date",
                                      status: "error",
                                      duration: 1000,
                                      isClosable: true,
                                    });
                                    e.target.value = "";
                                  } else {
                                    dispatchExperience({
                                      type: "UPDATE_EXPERIENCE",
                                      payload: {
                                        id: experience.id,
                                        updates: { startDate: e.target.value },
                                      },
                                    });
                                  }
                                }}
                              />
                            </FormControl>
                            {!experience.isCurrentlyWorking && (
                              <FormControl isRequired>
                                <FormLabel>End Date</FormLabel>
                                <Input
                                  //   value={}
                                  isDisabled={experience.startDate === ""}
                                  bg="white"
                                  color="black"
                                  focusBorderColor="#790202"
                                  type="date"
                                  maxW="sm"
                                  onChange={(e) => {
                                    if (
                                      moment().format("YYYY-MM-DD") <
                                        e.target.value ||
                                      e.target.value < experience.startDate
                                    ) {
                                      toast({
                                        title: "Error",
                                        description: "Enter a valid end date",
                                        status: "error",
                                        duration: 1000,
                                        isClosable: true,
                                      });
                                      e.target.value = "";
                                    } else {
                                      dispatchExperience({
                                        type: "UPDATE_EXPERIENCE",
                                        payload: {
                                          id: experience.id,
                                          updates: { endDate: e.target.value },
                                        },
                                      });
                                    }

                                    console.log(e.target.value);
                                    // const date = moment(e.target.value, "YYYY-MM-DD");

                                    // console.log("year", date.year());
                                    // console.log("month", date.format("MMMM"));
                                    // console.log("date", date.date());
                                  }}
                                />
                              </FormControl>
                            )}
                          </Flex>
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>Job Description</FormLabel>
                          <Textarea
                            value={experience.jobDescription || ""}
                            bg="white"
                            color="black"
                            focusBorderColor="#790202"
                            onChange={(e) => {
                              dispatchExperience({
                                type: "UPDATE_EXPERIENCE",
                                payload: {
                                  id: experience.id,
                                  updates: { jobDescription: e.target.value },
                                },
                              });
                              //   console.log(experience);
                            }}
                          />
                        </FormControl>
                      </Flex>
                      <Button
                        mt={5}
                        onClick={() =>
                          dispatchExperience({
                            type: "DELETE_EXPERIENCE",
                            payload: { id: experience.id },
                          })
                        }
                        variant="outline"
                        colorScheme="red"
                        bg="white"
                      >
                        Delete
                      </Button>
                    </Box>
                  ))}
                  <Button
                    onClick={() =>
                      dispatchExperience({ type: "ADD_EXPERIENCE" })
                    }
                  >
                    + Add Experience
                  </Button>
                </Box>
              </TabPanel>
              <TabPanel>
                {/* Education */}
                <Box>
                  <Heading as="h3" size="lg" mb={5}>
                    Education
                  </Heading>
                  {education.map((edu, index) => (
                    <Box
                      key={edu.id}
                      mb={4}
                      bg="gray.200"
                      p={5}
                      borderRadius={10}
                    >
                      <Heading as="h4" size="md" mb={5}>
                        Education {index + 1}
                      </Heading>
                      <Flex flexDirection="column" gap={3}>
                        <FormControl isRequired>
                          <FormLabel>Instituion</FormLabel>
                          <Input
                            value={edu.institution || ""}
                            bg="white"
                            color="black"
                            focusBorderColor="#790202"
                            onChange={(e) => {
                              dispatchEducation({
                                type: "UPDATE_EDUCATION",
                                payload: {
                                  id: edu.id,
                                  updates: { institution: e.target.value },
                                },
                              });
                              //   console.log(education);
                            }}
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>Course Type</FormLabel>
                          <Input
                            value={edu.courseType || ""}
                            bg="white"
                            color="black"
                            focusBorderColor="#790202"
                            onChange={(e) => {
                              dispatchEducation({
                                type: "UPDATE_EDUCATION",
                                payload: {
                                  id: edu.id,
                                  updates: { courseType: e.target.value },
                                },
                              });
                              //   console.log(education);
                            }}
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>Course Name</FormLabel>
                          <Input
                            value={edu.courseName || ""}
                            bg="white"
                            color="black"
                            focusBorderColor="#790202"
                            onChange={(e) => {
                              dispatchEducation({
                                type: "UPDATE_EDUCATION",
                                payload: {
                                  id: edu.id,
                                  updates: { courseName: e.target.value },
                                },
                              });
                              //   console.log(education);
                            }}
                          />
                        </FormControl>
                        <FormControl>
                          <Flex alignItems="center">
                            <FormLabel>Currently Persuing</FormLabel>
                            <Checkbox
                              isChecked={edu.isCurrentlyPersuing || false}
                              outline="none"
                              border="none"
                              borderRadius={2}
                              colorScheme="red"
                              bg="white"
                              focusBorderColor="#790202"
                              onChange={(e) => {
                                dispatchEducation({
                                  type: "UPDATE_EDUCATION",
                                  payload: {
                                    id: edu.id,
                                    updates: {
                                      isCurrentlyPersuing: e.target.checked,
                                    },
                                  },
                                });
                                // console.log(education);
                              }}
                            />
                          </Flex>
                        </FormControl>
                        <Flex gap={2} justifyContent="flex-start">
                          <FormControl isRequired>
                            <FormLabel>Start Date</FormLabel>
                            <Input
                              // value={}
                              bg="white"
                              color="black"
                              focusBorderColor="#790202"
                              type="date"
                              maxW="sm"
                              onChange={(e) => {
                                if (
                                  moment().format("YYYY-MM-DD") <
                                    e.target.value ||
                                  (edu.endDate !== "" &&
                                    e.target.value > edu.endDate)
                                ) {
                                  toast({
                                    title: "Error",
                                    description: "Enter a valid start date",
                                    status: "error",
                                    duration: 1000,
                                    isClosable: true,
                                  });
                                  e.target.value = "";
                                } else {
                                  dispatchEducation({
                                    type: "UPDATE_EDUCATION",
                                    payload: {
                                      id: edu.id,
                                      updates: { startDate: e.target.value },
                                    },
                                  });
                                }
                              }}
                            />
                          </FormControl>
                          {!edu.isCurrentlyPersuing && (
                            <FormControl isRequired>
                              <FormLabel>End Date</FormLabel>
                              <Input
                                //   value={}
                                isDisabled={edu.startDate === ""}
                                bg="white"
                                color="black"
                                focusBorderColor="#790202"
                                type="date"
                                maxW="sm"
                                onChange={(e) => {
                                  if (
                                    moment().format("YYYY-MM-DD") <
                                      e.target.value ||
                                    e.target.value < edu.startDate
                                  ) {
                                    toast({
                                      title: "Error",
                                      description: "Enter a valid end date",
                                      status: "error",
                                      duration: 1000,
                                      isClosable: true,
                                    });
                                    e.target.value = "";
                                  } else {
                                    dispatchEducation({
                                      type: "UPDATE_EDUCATION",
                                      payload: {
                                        id: edu.id,
                                        updates: { endDate: e.target.value },
                                      },
                                    });
                                  }

                                  console.log(e.target.value);
                                  // const date = moment(e.target.value, "YYYY-MM-DD");

                                  // console.log("year", date.year());
                                  // console.log("month", date.format("MMMM"));
                                  // console.log("date", date.date());
                                }}
                              />
                            </FormControl>
                          )}
                        </Flex>
                        <FormControl isRequired>
                          <FormLabel>Job Description</FormLabel>
                          <Textarea
                            value={edu.description || ""}
                            bg="white"
                            color="black"
                            focusBorderColor="#790202"
                            onChange={(e) => {
                              dispatchEducation({
                                type: "UPDATE_EDUCATION",
                                payload: {
                                  id: edu.id,
                                  updates: { description: e.target.value },
                                },
                              });
                              //   console.log(education);
                            }}
                          />
                        </FormControl>
                      </Flex>
                      <Button
                        mt={5}
                        onClick={() =>
                          dispatchEducation({
                            type: "DELETE_EDUCATION",
                            payload: { id: edu.id },
                          })
                        }
                        variant="outline"
                        colorScheme="red"
                        bg="white"
                      >
                        Delete
                      </Button>
                    </Box>
                  ))}
                  <Button
                    onClick={() => dispatchEducation({ type: "ADD_EDUCATION" })}
                  >
                    + Add Education
                  </Button>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Flex justifyContent="center" alignItems="center">
            <Button
              variant="unstyled"
              bg="white"
              color="#790202"
              border={"1px solid #790202"}
              px={5}
              py={2}
              w="xs"
              type="submit"
              _hover={{
                bg: "#790202",
                color: "white",
              }}
              _active={{
                bg: "#ba1117",
                color: "white",
              }}
            >
              PUBLISH
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
}

export default Tod;
