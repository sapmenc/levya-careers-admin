import { useEffect, useState } from "react";

import AccessDenied from "../components/AccessDenied";
import Loader from "../components/loader/Loader";
import React from "react";
import Sidebar from "../components/Sidebar";
import UserContent from "../components/UserContent";
import { fetchCurrentUser } from "../api";

function Userspage({ textColor }) {
  const [userRole, setUserRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);
  let token = localStorage.getItem("auth");
  if (localStorage.getItem("auth") === null) {
    window.location.href = "/login";
  }
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
      <UserContent textColor={textColor} />
    </>
  ) : (
    <AccessDenied textColor={textColor} />
  );
}

export default Userspage;
