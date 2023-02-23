import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import React from "react";
import moment from "moment";

function FormEducations({ educations, dispatchEducations }) {
  const toast = useToast();
  const courseTypes = [
    "School",
    "Junior College",
    "Bachelor's",
    "Masters",
    "Diploma",
    "Ph.D",
  ];
  return (
    <Box>
      <Heading as="h3" size="lg" mb={5}>
        Education
      </Heading>
      {educations.map((edu, index) => (
        <Box key={edu.id} mb={4} bg="gray.200" p={5} borderRadius={10}>
          <Heading as="h4" size="md" mb={8}>
            Education {index + 1}
          </Heading>
          <Flex flexDirection="column" gap={6}>
            <FormControl isRequired>
              <FormLabel>Institution</FormLabel>
              <Input
                value={edu.institution || ""}
                bg="white"
                color="black"
                focusBorderColor="#790202"
                onChange={(e) => {
                  dispatchEducations({
                    type: "UPDATE_EDUCATION",
                    payload: {
                      id: edu.id,
                      updates: { institution: e.target.value },
                    },
                  });
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Course Type</FormLabel>
              <Select
                placeholder="Select option"
                focusBorderColor="#790202"
                bg="white"
                value={edu.courseType || ""}
                onChange={(e) => {
                  dispatchEducations({
                    type: "UPDATE_EDUCATION",
                    payload: {
                      id: edu.id,
                      updates: { courseType: e.target.value },
                    },
                  });
                }}
              >
                {courseTypes.map((courseType) => {
                  return <option value={courseType}>{courseType}</option>;
                })}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Course Name</FormLabel>
              <Input
                value={edu.courseName || ""}
                bg="white"
                color="black"
                focusBorderColor="#790202"
                onChange={(e) => {
                  dispatchEducations({
                    type: "UPDATE_EDUCATION",
                    payload: {
                      id: edu.id,
                      updates: { courseName: e.target.value },
                    },
                  });
                }}
              />
            </FormControl>
            <Flex flexDir="column">
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
                      if (e.target.checked) {
                        dispatchEducations({
                          type: "UPDATE_EDUCATION",
                          payload: {
                            id: edu.id,
                            updates: {
                              isCurrentlyPersuing: e.target.checked,
                              endDate: moment().format("YYYY-MM-DD"),
                            },
                          },
                        });
                      } else {
                        dispatchEducations({
                          type: "UPDATE_EDUCATION",
                          payload: {
                            id: edu.id,
                            updates: {
                              isCurrentlyPersuing: e.target.checked,
                              endDate: "",
                            },
                          },
                        });
                      }
                    }}
                  />
                </Flex>
              </FormControl>
              <Flex gap={2} justifyContent="flex-start">
                <FormControl isRequired>
                  <FormLabel>Start Date</FormLabel>
                  <Input
                    value={edu.startDate || ""}
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
                        dispatchEducations({
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
                      value={edu.endDate || ""}
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
                          dispatchEducations({
                            type: "UPDATE_EDUCATION",
                            payload: {
                              id: edu.id,
                              updates: { endDate: e.target.value },
                            },
                          });
                        }
                      }}
                    />
                  </FormControl>
                )}
              </Flex>
            </Flex>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={edu.description || ""}
                bg="white"
                color="black"
                focusBorderColor="#790202"
                onChange={(e) => {
                  dispatchEducations({
                    type: "UPDATE_EDUCATION",
                    payload: {
                      id: edu.id,
                      updates: { description: e.target.value },
                    },
                  });
                }}
              />
            </FormControl>
          </Flex>
          <Button
            mt={5}
            onClick={() =>
              dispatchEducations({
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
      <Button onClick={() => dispatchEducations({ type: "ADD_EDUCATION" })}>
        + Add Education
      </Button>
    </Box>
  );
}

export default FormEducations;
