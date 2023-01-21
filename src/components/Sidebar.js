import { Box, Divider, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  Command,
  Clipboard,
  Server,
  LogOut,
  UserPlus,
  Image as ImageIcon,
} from "react-feather";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "../api";
import "./sidebar.css";

function Sidebar() {
  const [userRole, setUserRole] = useState("");
  let token = localStorage.getItem("auth");
  const navigate = useNavigate();
  const getCurrentUser = async () => {
    const { data } = await fetchCurrentUser(token);
    if (data.error) {
      window.location.href = "/login";
    }
    setUserRole(data.data.role);
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <div className="navigation">
      <Box
        py={2}
        px={4}
        borderRadius={"md"}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          display="block"
          my={2}
          mx={4}
          src="/assets/Ample_Logoround.png"
          objectFit="contain"
          alt="Levya"
          w="100%"
          h="30px"
        />
      </Box>
      <ul>
        <NavLink to="/">
          <li
            id="dashboard"
            className="list"
            onClick={() => {
              navigate("/");
              document
                .getElementById("dashboard")
                .classList.add("activeModule");
            }}
          >
            <span className="icon">
              <Command color="#FFF" />
            </span>
            <span className="title">Dashboard</span>
          </li>
        </NavLink>

        {userRole === "admin" && (
          <>
            <NavLink to="/users">
              <li
                id="users"
                className="list"
                onClick={() => {
                  document
                    .getElementById("users")
                    .classList.add("activeModule");
                }}
              >
                <span className="icon">
                  <UserPlus color="#FFF" />
                </span>
                <span className="title">User Management</span>
              </li>
            </NavLink>
          </>
        )}
        <NavLink to="/jobs">
          <li
            id="jobs"
            className="list"
            onClick={() => {
              document.getElementById("jobs").classList.add("activeModule");
            }}
          >
            <span className="icon">
              <Clipboard color="#FFF" />
            </span>
            <span className="title">Job Posts</span>
          </li>
        </NavLink>
        <NavLink to="/appearance">
          <li
            id="appearance"
            className="list"
            onClick={() => {
              document
                .getElementById("appearance")
                .classList.add("activeModule");
            }}
          >
            <span className="icon">
              <ImageIcon color="#FFF" />
            </span>
            <span className="title">Appearance</span>
          </li>
        </NavLink>

        {userRole === "admin" && (
          <>
            <NavLink to="/domains">
              <li
                id="domains"
                className="list"
                onClick={() => {
                  document
                    .getElementById("domains")
                    .classList.add("activeModule");
                }}
              >
                <span className="icon">
                  <Server color="#FFF" />
                </span>
                <span className="title">Domains</span>
              </li>
            </NavLink>
          </>
        )}

        <Divider />
        <li
          className="list"
          onClick={() => {
            navigate("/login");
          }}
        >
          <span className="icon">
            <LogOut color="#FFF" />
          </span>
          <span className="title">Sign out</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
