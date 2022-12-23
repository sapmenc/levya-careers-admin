import { Flex } from "@chakra-ui/react";
import React from "react";
import Domains from "../components/Domains";
import Sidebar from "../components/Sidebar";

function Domainspage() {
  if (localStorage.getItem("auth") === null) {
    window.location.href = "/login";
  }
  return (
    <>
      <Domains />
    </>
  );
}

export default Domainspage;
