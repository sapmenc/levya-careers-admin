import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import {
  defaultEducation,
  defaultExperience,
  defaultPreferredLocations,
  educationsReducer,
  experiencesReducer,
  preferredLocationsReducer,
} from "../todUtilities.js";
import { useReducer, useState } from "react";

import FormEducations from "./FormEducations";
import FormExperiences from "./FormExperiences";
import FormName from "./FormName";
import FormProfileTitle from "./FormProfileTitle";
import FormSkills from "./FormSkills";

function Form() {
  const [name, setName] = useState("");
  const [profileTitle, setProfileTitle] = useState("");
  const [skills, setSkills] = useState(new Set([]));
  const [experiences, dispatchExperiences] = useReducer(experiencesReducer, [
    defaultExperience,
  ]);
  const [educations, dispatchEducations] = useReducer(educationsReducer, [
    defaultEducation,
  ]);
  return (
    <Flex flexDir="column" gap={5}>
      <Flex flexDir="column" gap={5}>
        <FormName setName={setName} />
        <FormProfileTitle setProfileTitle={setProfileTitle} />
        <FormSkills skills={skills} setSkills={setSkills} />
        <Tabs variant="soft-rounded" colorScheme="red">
          <TabList display="flex" justifyContent="center">
            <Tab>Experience</Tab>
            <Tab>Education</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <FormExperiences
                experiences={experiences}
                dispatchExperiences={dispatchExperiences}
              />
            </TabPanel>
            <TabPanel>
              <FormEducations
                educations={educations}
                dispatchEducations={dispatchEducations}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
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
    </Flex>
  );
}

export default Form;
