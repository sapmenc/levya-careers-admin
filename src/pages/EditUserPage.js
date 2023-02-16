import { useEffect, useState } from "react";

import AccessDenied from "../components/AccessDenied";
import EditUser from "../components/User/EditUser";
import { Flex } from "@chakra-ui/react";
import Loader from "../components/loader/Loader";
import React from "react";
import { fetchCurrentUser } from "../api";
import { useParams } from "react-router-dom";

function EditUserPage({ textColor }) {
  const param = useParams();
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
