import Dashboard from "../components/dashboardModule/Dashboard";
import React from "react";

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
