import { useEffect, useState } from "react";

import AccessDenied from "../components/AccessDenied";
import CreateUser from "../components/User/CreateUser";
import { Flex } from "@chakra-ui/react";
import Loader from "../components/loader/Loader";
import React from "react";
import Sidebar from "../components/Sidebar";
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
