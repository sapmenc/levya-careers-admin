import { Flex } from "@chakra-ui/react";
import React from "react";
import CreateJob from "../components/Job/CreateJob";
import Sidebar from "../components/Sidebar";

function CreateJobpage() {
  if (localStorage.getItem("auth") === null) {
    window.location.href = "/login";
  }
  return (
    <>
      <CreateJob />
    </>
  );
}

export default CreateJobpage;
