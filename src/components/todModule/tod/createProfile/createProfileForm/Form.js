import {
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
  educationsReducer,
  experiencesReducer,
  preferredLocationsReducer,
} from "./todUtilities.js";
import { useReducer, useState } from "react";

import FormEducations from "./FormEducations";
import FormExperiences from "./FormExperiences";
import FormName from "./FormName";
import FormPreferredLocations from "./preferredLocation/FormPreferredLocations.js";
import FormPrimaryLocation from "./FormPrimaryLocation.js";
import FormProfileTitle from "./FormProfileTitle.js";
import FormSkills from "./FormSkills";
import FormTodTitle from "./FormTodTitle";

function Form() {
  const [name, setName] = useState("");
  const [profileTitle, setProfileTitle] = useState("");
  const [todTitle, setTodTitle] = useState("");
  const [skills, setSkills] = useState(new Set([]));
  const [primaryLocation, setPrimaryLocation] = useState(null);
  const [experiences, dispatchExperiences] = useReducer(experiencesReducer, [
    defaultExperience,
  ]);
  const [educations, dispatchEducations] = useReducer(educationsReducer, [
    defaultEducation,
  ]);
  const [preferredLocations, dispatchPreferredLocations] = useReducer(
    preferredLocationsReducer,
    []
  );

  const handlePublish = () => {
    const body = {
      name: name,
      primaryLocation: primaryLocation,
      preferredLocations: preferredLocations,
      experiences: experiences,
      profileTitle: profileTitle,
      todTitle: todTitle,
      skills: skills,
      educations: educations,
      status: "active",
      keywords: new Set([]),
      yearsOfExperience: 0,
    };
    console.log(body);
  };
  return (
    <Flex flexDir="column" gap={5}>
      <Flex flexDir="column" gap={7}>
        <FormName setName={setName} />
        <FormProfileTitle setProfileTitle={setProfileTitle} />
        <FormTodTitle setTodTitle={setTodTitle} />
        <FormSkills skills={skills} setSkills={setSkills} />
        <FormPrimaryLocation
          primaryLocation={primaryLocation}
          setPrimaryLocation={setPrimaryLocation}
        />
        <FormPreferredLocations
          preferredLocations={preferredLocations}
          dispatchPreferredLocations={dispatchPreferredLocations}
        />
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
          onClick={handlePublish}
        >
          PUBLISH
        </Button>
      </Flex>
    </Flex>
  );
}

export default Form;
