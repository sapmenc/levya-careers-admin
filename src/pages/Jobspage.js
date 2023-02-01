import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import JobContent from "../components/JobContent";
import Sidebar from "../components/Sidebar";

function Jobspage({ textColor }) {
  if (localStorage.getItem("auth") === null) {
    window.location.href = "/login";
  }
  return (
    <>
      <JobContent textColor={textColor} />
    </>
  );
}

export default Jobspage;
