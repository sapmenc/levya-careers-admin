import Domains from "../components/domainModule/Domains";
import React from "react";

function Domainspage({ textColor }) {
  if (localStorage.getItem("auth") === null) {
    window.location.href = "/login";
  }
  return (
    <>
      <Domains textColor={textColor} />
    </>
  );
}

export default Domainspage;
