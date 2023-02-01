import React from "react";
import Appearance from "../components/Appearance";

function Appearancepage({ textColor, setTextColor }) {
  if (localStorage.getItem("auth") === null) {
    window.location.href = "/login";
  }
  return (
    <>
      <Appearance textColor={textColor} setTextColor={setTextColor} />
    </>
  );
}

export default Appearancepage;
