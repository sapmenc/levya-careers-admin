import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { fetchCurrentUser } from "../api";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";

function Homepage({ textColor }) {
  if (localStorage.getItem("auth") === null) {
    window.location.href = "/login";
  }
  return (
    <>
      <Dashboard textColor={textColor} />
    </>
  );
}

export default Homepage;
