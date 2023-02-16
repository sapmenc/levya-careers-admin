import Appearance from "../components/appearanceModule/Appearance";
import React from "react";

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
