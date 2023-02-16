import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Appearancepage from "./pages/Appearancepage";
import CreateJobpage from "./pages/CreateJobpage";
import CreateUserpage from "./pages/CreateUserPage";
import Domainspage from "./pages/Domainspage";
import EditJobpage from "./pages/EditJobpage";
import EditUserpage from "./pages/EditUserPage";
import { Flex } from "@chakra-ui/react";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { Heading } from "@chakra-ui/react";
import Homepage from "./pages/Homepage";
import Jobspage from "./pages/Jobspage";
import Login from "./pages/Login";
import Sidebar from "./components/sidebarModule/Sidebar";
import TodCreateProfilePage from "./pages/TodCreateProfilePage";
import TodEditProfilePage from "./pages/TodEditProfilePage";
import TodPage from "./pages/TodPage";
import TodTitlesPage from "./pages/TodTitlesPage";
import Userspage from "./pages/Userspage";
import { fetchCurrentUser } from "./api";
import { useLocation } from "react-router-dom";

var locationName = "notFound";
function App() {
  const token = localStorage.getItem("auth");
  const location = useLocation();
  const [user, setUser] = useState({});
  const [textColor, setTextColor] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  let module = "dashboard";
  useEffect(() => {
    let activeModuleElements = Object.values(
      document.getElementsByClassName("activeModule")
    );
    activeModuleElements.forEach((element) => {
      element.classList.remove("activeModule");
    });
    let locationPath = location.pathname.split("/");
    let possibleLocations = [
      "",
      "jobs",
      "domains",
      "createjob",
      "editjob",
      "login",
      "users",
      "appearance",
      "createuser",
      "edituser",
      "tod",
      "todTitles",
      "createProfile",
      "editProfile",
    ];

    for (let i = locationPath.length - 1; i >= 0; i--) {
      if (possibleLocations.includes(locationPath[i])) {
        locationName = locationPath[i];
        break;
      }
    }

    if (locationName === "") module = "dashboard";
    else if (
      locationName === "jobs" ||
      locationName === "createjob" ||
      locationName === "editjob"
    )
      module = "jobs";
    else if (locationName === "domains") module = "domains";
    else if (
      locationName === "users" ||
      locationName === "createuser" ||
      locationName === "edituser"
    )
      module = "users";
    else if (locationName === "appearance") module = "appearance";
    else if (
      locationName === "tod" ||
      locationName === "createProfile" ||
      locationName === "editProfile"
    )
      module = "tod";
    else if (locationName === "todTitles") module = "todTitles";
    let element = document.getElementById(module);
    element?.classList.add("activeModule");
  }, [location]);

  const applyDefaultTheme = async () => {
    try {
      const appearance = user?.appearance;
      const textColor = user?.textColor;
      if (appearance) {
        document.getElementById(
          "bg"
        ).style.backgroundImage = `url(${appearance.image})`;
      }
      if (textColor) {
        document.getElementById("bg").style.color = textColor;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getCurrentUser = async () => {
    const { data } = await fetchCurrentUser(token);
    setTextColor(data.data.textColor);
    setBackgroundImage(data.data.appearance.image);

    if (data.error) {
      window.location.href = "/login";
    }
    setUser(data.data);
  };
  useEffect(() => {
    getCurrentUser();
    applyDefaultTheme();
  }, []);

  useEffect(() => {
    document.getElementById(
      "bg"
    ).style.backgroundImage = `url(${backgroundImage})`;
  }, [backgroundImage]);
  return (
    <Flex h="100vh" justifyContent="flex-start" id="bg">
      {location.pathname.split("/")[location.pathname.split("/").length - 1] ===
        "login" ||
      location.pathname.split("/")[location.pathname.split("/").length - 1] ===
        "forgotPassword" ? (
        <></>
      ) : (
        <>
          <Sidebar />
        </>
      )}
      <Routes>
        <Route path="/" element={<Homepage textColor={textColor} />} />
        <Route path="/login" element={<Login textColor={textColor} />} />
        <Route path="/jobs" element={<Jobspage textColor={textColor} />} />
        <Route
          path="/domains"
          element={<Domainspage textColor={textColor} />}
        />
        <Route
          path="/createjob"
          element={<CreateJobpage textColor={textColor} />}
        />
        <Route
          path="/editjob/:id"
          element={<EditJobpage textColor={textColor} />}
        />
        <Route path="/users" element={<Userspage textColor={textColor} />} />
        <Route
          path="/users/createuser"
          element={<CreateUserpage textColor={textColor} />}
        />
        <Route
          path="/users/edituser/:id"
          element={<EditUserpage textColor={textColor} />}
        />
        <Route
          path="/appearance"
          element={
            <Appearancepage
              textColor={textColor}
              setTextColor={setTextColor}
              backgroundImage={backgroundImage}
              setBackgroundImage={setBackgroundImage}
            />
          }
        />
        <Route
          path="/forgotPassword"
          element={<ForgotPasswordPage textColor={textColor} />}
        />
        <Route path="/tod" element={<TodPage textColor={textColor} />} />
        <Route
          path="/tod/createProfile"
          element={<TodCreateProfilePage textColor={textColor} />}
        />
        <Route
          path="/tod/editProfile/:id"
          element={<TodEditProfilePage textColor={textColor} />}
        />
        <Route
          path="/todTitles"
          element={<TodTitlesPage textColor={textColor} />}
        />
        <Route path="*" element={<Heading>Page Not Found</Heading>} />
      </Routes>
    </Flex>
  );
}

export default App;
