import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

function FormSkills({ skills, setSkills }) {
  const [currSkill, setCurrSkill] = useState("");

  return (
    <FormControl>
      <FormLabel fontWeight="bold">Also skilled at [Max 2] </FormLabel>
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
  );
}

export default FormSkills;
