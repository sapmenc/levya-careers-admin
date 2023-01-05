import { Flex } from "@chakra-ui/react";
import React from "react";
import Sidebar from "../components/Sidebar";
import UserContent from "../components/UserContent";

function Userspage() {
  if (localStorage.getItem("auth") === null) {
    window.location.href = "/login";
  }
  return (
    <>
      <UserContent />
    </>
  );
}

export default Userspage;
