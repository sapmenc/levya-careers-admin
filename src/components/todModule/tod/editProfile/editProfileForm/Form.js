import {
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import {
  defaultEducation,
  defaultExperience,
  educationsReducer,
  experiencesReducer,
  preferredLocationsReducer,
} from "../../todUtilities.js";
import { useReducer, useState } from "react";

import FormEducations from "./FormEducations";
import FormEmail from "./FormEmail.js";
import FormExperiences from "./FormExperiences";
import FormMobile from "./FormMobile.js";
import FormName from "./FormName";
import FormPreferredLocations from "./preferredLocation/FormPreferredLocations.js";
import FormPrimaryLocation from "./FormPrimaryLocation.js";
import FormProfileTitle from "./FormProfileTitle.js";
import FormSkills from "./FormSkills";
import FormTodTitle from "./FormTodTitle";
import { editProfile } from "../../../../../api/index.js";

function Form() {
  const token = localStorage.getItem("auth");
  const toast = useToast();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
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

  const handleEditProfile =async () => {
    const body = {
      name: name,
      mobile: mobile,
      email: email,
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
    try{
      const {data} = await editProfile(token, body);
      console.log(data);
    }
    catch(err){

      console.log(err);
    }
    console.log(body);
  };
  return (
    <Flex flexDir="column" gap={5}>
      <Flex flexDir="column" gap={7}>
        <FormName setName={setName} />
        <FormMobile setMobile={setMobile} />
        <FormEmail setEmail={setEmail} />
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
          onClick={handleEditProfile}
        >
          Edit
        </Button>
      </Flex>
    </Flex>
  );
}

export default Form;
