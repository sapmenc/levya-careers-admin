import React from "react";
import CreateJob from "../components/Job/CreateJob";

function CreateJobpage() {
  if (localStorage.getItem("auth") === null) {
    window.location.href = "/login";
  }
  return (
    <CreateJob />
  );
}

export default CreateJobpage;
