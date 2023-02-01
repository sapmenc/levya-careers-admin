import { Flex } from "@chakra-ui/react";
import React from "react";
import Sidebar from "../components/Sidebar";
import CreateUser from "../components/User/CreateUser";
import AccessDenied from "../components/AccessDenied";
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../api";

function CreateUserPage({ textColor }) {
  const [userRole, setUserRole] = useState("user");
  const [readyToRender, setReadyToRender] = useState(false);
  let token = localStorage.getItem("auth");
  const getCurrentUser = async () => {
    const { data } = await fetchCurrentUser(token);
    if (data.error) {
      window.location.href = "/login";
    }
    setUserRole(data.data.role);
  };
  useEffect(() => {
    getCurrentUser().then(() => {
      setReadyToRender(true);
    });
  }, []);
  return (
    readyToRender &&
    (userRole === "admin" ? (
      <>
        <CreateUser textColor={textColor} />
      </>
    ) : (
      <AccessDenied textColor={textColor} />
    ))
  );
}

export default CreateUserPage;
