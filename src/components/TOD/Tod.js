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
} from "@chakra-ui/react";
import {
  defaultExperience,
  defaultEducation,
  experiencesReducer,
  educationReducer,
} from "./todUtilities";
import moment from "moment";

function Tod() {
  const [experiences, dispatchExperience] = useReducer(experiencesReducer, [
    defaultExperience,
  ]);
  const [education, dispatchEducation] = useReducer(educationReducer, [
    defaultEducation,
  ]);
  const toast = useToast();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    console.log("submitted");
  };

  return (
    <Flex
      w="100%"
      overflowX="hidden"
      justifyContent="center"
      bg="white"
      m={10}
      borderRadius={5}
    >
      <Box w="90%" h="100%" bg="white" p={5}>
        <form onSubmit={handleSubmit}>
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
                              moment().format("YYYY-MM-DD") < e.target.value ||
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
              onClick={() => dispatchExperience({ type: "ADD_EXPERIENCE" })}
            >
              + Add Experience
            </Button>
          </Box>

          {/* Education */}
          <Box mt={10}>
            <Heading as="h3" size="lg" mb={5}>
              Education
            </Heading>
            {education.map((edu, index) => (
              <Box key={edu.id} mb={4} bg="gray.200" p={5} borderRadius={10}>
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
                            moment().format("YYYY-MM-DD") < e.target.value ||
                            (edu.endDate !== "" && e.target.value > edu.endDate)
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
                              moment().format("YYYY-MM-DD") < e.target.value ||
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
