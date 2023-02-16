import CreateJob from "../components/jobModule/Job/CreateJob.js";
import React from "react";

function CreateJobpage({ textColor }) {
  if (localStorage.getItem("auth") === null) {
    window.location.href = "/login";
  }
  return <CreateJob textColor={textColor} />;
}

export default CreateJobpage;
