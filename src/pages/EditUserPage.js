import { Flex } from "@chakra-ui/react";
import React from "react";
import EditUser from "../components/User/EditUser";
import AccessDenied from "../components/AccessDenied";
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../api";
import { useParams } from "react-router-dom";

function EditUserPage({ textColor }) {
  const param = useParams();
  const [user, setUser] = useState({});
  const [userRole, setUserRole] = useState("user");
  const [readyToRender, setReadyToRender] = useState(false);
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
    getCurrentUser().then(() => {
      setReadyToRender(true);
    });
  }, []);
  return (
    readyToRender &&
    (userRole === "admin" && user?._id != param?.id ? (
      <>
        <EditUser textColor={textColor} />
      </>
    ) : (
      <AccessDenied textColor={textColor} />
    ))
  );
}

export default EditUserPage;
