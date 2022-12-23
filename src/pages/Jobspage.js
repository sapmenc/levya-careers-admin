import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import JobContent from "../components/JobContent";
import Sidebar from "../components/Sidebar";

function Jobspage() {
  if (localStorage.getItem("auth") === null) {
    window.location.href = "/login";
  }
  return (
    <>
      <JobContent />
    </>
  );
}

export default Jobspage;
