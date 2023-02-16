import { useEffect, useState } from "react";

import AccessDenied from "../components/utilityComponents/accessDenied/AccessDenied";
import CreateUser from "../components/userModule/User/CreateUser.js";
import Loader from "../components/utilityComponents/loader/Loader";
import React from "react";
import { fetchCurrentUser } from "../api";

function CreateUserPage({ textColor }) {
  const [userRole, setUserRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);
  let token = localStorage.getItem("auth");
  const getCurrentUser = async () => {
    const { data } = await fetchCurrentUser(token);
    if (data.error) {
      window.location.href = "/login";
    }
    setUserRole(data.data.role);
  };
  useEffect(() => {
    setIsLoading(true);
    getCurrentUser().then(() => {
      setIsLoading(false);
    });
  }, []);
  return isLoading ? (
    <Loader textColor={textColor} />
  ) : userRole === "admin" ? (
    <>
      <CreateUser textColor={textColor} />
    </>
  ) : (
    <AccessDenied textColor={textColor} />
  );
}

export default CreateUserPage;
