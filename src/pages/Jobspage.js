import JobContent from "../components/jobModule/JobContent";
import React from "react";

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
