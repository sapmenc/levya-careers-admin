import React from "react";
import UpdateJob from "../components/jobModule/Job/UpdateJob";
import { useParams } from "react-router-dom";

function EditJobpage({ textColor }) {
  const jid = useParams();
  if (localStorage.getItem("auth") === null) {
    window.location.href = "/login";
  }
  return <UpdateJob jid={jid} textColor={textColor} />;
}

export default EditJobpage;
