import React from "react";
import TodEditProfile from "../components/todModule/tod/editProfile/TodEditProfile.js";
import { useParams } from "react-router-dom";

function TodEditProfilePage() {
  const params = useParams();
  return <TodEditProfile profileId={params.id} />;
}

export default TodEditProfilePage;
