import React from "react";
import Sidebar from "../components/Sidebar";
import { Flex } from "@chakra-ui/react";
import UpdateJob from "../components/Job/UpdateJob";
import { useParams } from "react-router-dom";

function EditJobpage({ textColor }) {
  const jid = useParams();
  if (localStorage.getItem("auth") === null) {
    window.location.href = "/login";
  }
  return <UpdateJob jid={jid} textColor={textColor} />;
}

export default EditJobpage;
