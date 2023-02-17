import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import React from "react";
import moment from "moment";

function FormExperiences({ experiences, dispatchExperiences }) {
  const toast = useToast();
  return (
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
          <Heading as="h4" size="md" mb={8}>
            Experience {index + 1}
          </Heading>
          <Flex flexDirection="column" gap={6}>
            <FormControl isRequired>
              <FormLabel>Company Name</FormLabel>
              <Input
                value={experience.companyName || ""}
                bg="white"
                color="black"
                focusBorderColor="#790202"
                value={experience.companyName || ""}
                onChange={(e) => {
                  dispatchExperiences({
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
                  dispatchExperiences({
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
                      dispatchExperiences({
                        type: "UPDATE_EXPERIENCE",
                        payload: {
                          id: experience.id,
                          updates: {
                            isCurrentlyWorking: e.target.checked,
                          },
                        },
                      });
                    } else {
                      dispatchExperiences({
                        type: "UPDATE_EXPERIENCE",
                        payload: {
                          id: experience.id,
                          updates: {
                            isCurrentlyWorking: e.target.checked,
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
                    value={experience.startDate || ""}
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
                        dispatchExperiences({
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
                      value={experience.endDate || ""}
                      isDisabled={experience.startDate === ""}
                      bg="white"
                      color="black"
                      focusBorderColor="#790202"
                      type="date"
                      maxW="sm"
                      onChange={(e) => {
                        if (
                          moment().format("YYYY-MM-DD") < e.target.value ||
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
                          dispatchExperiences({
                            type: "UPDATE_EXPERIENCE",
                            payload: {
                              id: experience.id,
                              updates: { endDate: e.target.value },
                            },
                          });
                        }
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
                  dispatchExperiences({
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
              dispatchExperiences({
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
      <Button onClick={() => dispatchExperiences({ type: "ADD_EXPERIENCE" })}>
        + Add Experience
      </Button>
    </Box>
  );
}

export default FormExperiences;
