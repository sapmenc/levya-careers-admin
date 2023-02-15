import React from "react";
import TodTitles from "../components/todModule/todTitles/TodTitles";

function TodTitlesPage({ textColor, setTextColor }) {
  return <TodTitles textColor={textColor} setTextColor={setTextColor} />;
}

export default TodTitlesPage;
