import React from "react";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import UserContent from "../components/UserContent";
import { fetchCurrentUser } from "../api";
import AccessDenied from "../components/AccessDenied";

function Userspage({ textColor }) {
  const [userRole, setUserRole] = useState("user");
  const [readyToRender, setReadyToRender] = useState(false);
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
    getCurrentUser().then(() => {
      setReadyToRender(true);
    });
  }, []);
  return (
    readyToRender &&
    (userRole === "admin" ? (
      <>
        <UserContent textColor={textColor} />
      </>
    ) : (
      <AccessDenied textColor={textColor} />
    ))
  );
}

export default Userspage;
