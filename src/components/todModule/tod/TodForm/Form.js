import {
  Button,
  Flex,
  FormControl,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import {
  educationsReducer,
  experiencesReducer,
  preferredLocationsReducer,
} from "../todUtilities.js";
import {
  isValidMobile,
  isValidateEmail,
} from "../../../../utitlityFunctions.js";
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
import { createProfile } from "../../../../api/index.js";

function Form() {
  const toast = useToast();
  const [name, setName] = useState("");
  const [profileTitle, setProfileTitle] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [todTitle, setTodTitle] = useState("");
  const [skills, setSkills] = useState(new Set([]));
  const [primaryLocation, setPrimaryLocation] = useState(null);
  const [experiences, dispatchExperiences] = useReducer(experiencesReducer, []);
  const [educations, dispatchEducations] = useReducer(educationsReducer, []);
  const [preferredLocations, dispatchPreferredLocations] = useReducer(
    preferredLocationsReducer,
    []
  );
  const validateForm = () => {
    if (!name) {
      toast({
        title: "Candidate name required!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }
    if (!mobile || !isValidMobile(mobile)) {
      toast({
        title: "Valid mobile number required!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }
    if (!email || !isValidateEmail(email)) {
      toast({
        title: "Valid email id required!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }
    if (!profileTitle) {
      toast({
        title: "Profile title required!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }
    if (!todTitle) {
      toast({
        title: "Tod title required!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }
    if (!primaryLocation) {
      toast({
        title: "Primary location required!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }
    if (preferredLocations.length < 1) {
      toast({
        title: "At least 1 preferred location required!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }
    if (preferredLocations.length > 3) {
      toast({
        title: "Max 3 preferred locations allowed!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }
    for (let i = 0; i < experiences.length; i++) {
      const {
        companyName,
        position,
        isCurrentlyWorking,
        startDate,
        endDate,
        jobDescription,
      } = experiences[i];
      if (!companyName) {
        toast({
          title: `In experience ${i + 1}, company name required!`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return false;
      }
      if (!position) {
        toast({
          title: `In experience ${i + 1}, position required!`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return false;
      }
      if (!startDate) {
        toast({
          title: `In experience ${i + 1}, start date required!`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return false;
      }
      if (!isCurrentlyWorking && !endDate) {
        toast({
          title: `In experience ${i + 1}, end date required!`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return false;
      }
      if (!jobDescription) {
        toast({
          title: `In experience ${i + 1}, job description required!`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return false;
      }
    }
    for (let i = 0; i < educations.length; i++) {
      const {
        institution,
        courseType,
        courseName,
        isCurrentlyPersuing,
        startDate,
        endDate,
        description,
      } = educations[i];
      if (!institution) {
        toast({
          title: `In education ${i + 1}, institution required!`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return false;
      }
      if (!courseType) {
        toast({
          title: `In education ${i + 1}, course type required!`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return false;
      }
      if (!courseName) {
        toast({
          title: `In education ${i + 1}, course name required!`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return false;
      }
      if (!startDate) {
        toast({
          title: `In education ${i + 1}, start date required!`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return false;
      }
      if (!isCurrentlyPersuing && !endDate) {
        toast({
          title: `In education ${i + 1}, end date required!`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return false;
      }
      if (!description) {
        toast({
          title: `In education ${i + 1}, description required!`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return false;
      }
    }
    return true;
  };
  const handlePublish = async () => {
    if (!validateForm()) {
      return;
    }
    const body = {
      name: name,
      mobile: mobile,
      email: email,
      profileTitle: profileTitle,
      todTitle: todTitle,
      primaryLocation: primaryLocation,
      preferredLocations: preferredLocations,
      experiences: experiences,
      skills: skills,
      educations: educations,
      status: "active",
      keywords: [],
      yearsOfExperience: 0,
    };
    console.log(body);
    try {
      const token = localStorage.getItem("auth");
      const res = await createProfile(token, body)
      if (res.status === 201) {
        toast({
          title: "Profile created successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    }
    catch (err) {
      toast({
        title: "Error creating profile!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex flexDir="column" gap={5}>
      <Flex flexDir="column" gap={7}>
        <FormName name={name} setName={setName} />
        <FormMobile mobile={mobile} setMobile={setMobile} />
        <FormEmail email={email} setEmail={setEmail} />
        <FormProfileTitle
          profileTitle={profileTitle}
          setProfileTitle={setProfileTitle}
        />
        <FormTodTitle todTitle={todTitle} setTodTitle={setTodTitle} />
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
