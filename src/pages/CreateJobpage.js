import React from "react";
import CreateJob from "../components/Job/CreateJob";

function CreateJobpage({ textColor }) {
  if (localStorage.getItem("auth") === null) {
    window.location.href = "/login";
  }
  return <CreateJob textColor={textColor} />;
}

export default CreateJobpage;
