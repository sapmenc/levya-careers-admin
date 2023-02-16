import { useEffect, useState } from "react";

import AccessDenied from "../components/utilityComponents/accessDenied/AccessDenied";
import EditUser from "../components/userModule/User/EditUser";
import Loader from "../components/utilityComponents/loader/Loader.js";
import React from "react";
import { fetchCurrentUser } from "../api";

function EditUserPage({ textColor }) {
  const [user, setUser] = useState({});
  const [userRole, setUserRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);
  let token = localStorage.getItem("auth");
  const getCurrentUser = async () => {
    const { data } = await fetchCurrentUser(token);
    if (data.error) {
      window.location.href = "/login";
    }
    setUser(data.data);
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
      <EditUser textColor={textColor} />
    </>
  ) : (
    <AccessDenied textColor={textColor} />
  );
}

export default EditUserPage;
