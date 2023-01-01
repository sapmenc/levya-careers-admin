import { Heading } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateUserpage from "./pages/CreateUserPage";
import CreateJobpage from "./pages/CreateJobpage";
import Domainspage from "./pages/Domainspage";
import Homepage from "./pages/Homepage";
import Jobspage from "./pages/Jobspage";
import Login from "./pages/Login";
import Userspage from "./pages/Userspage";
import Sidebar from "./components/Sidebar";
import EditJobpage from "./pages/EditJobpage";
import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Appearancepage from "./pages/Appearancepage";

var locationName = "notFound";
function App() {
  // module can have values : ["dashboard", "jobs", "domains"]
  const location = useLocation();
  let module = "dashboard";
  useEffect(() => {
    let activeModuleElements = Object.values(
      document.getElementsByClassName("activeModule")
    );
    activeModuleElements.forEach((element) => {
      element.classList.remove("activeModule");
    });
    let locationPath = location.pathname.split("/");
    // possible locationName : ["", "jobs", "domains", "createjob", "editjob", "login"]
    let possibleLocations = [
      "",
      "jobs",
      "domains",
      "createjob",
      "editjob",
      "login",
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
    let element = document.getElementById(module);
    element?.classList.add("activeModule");
  }, [location]);

  return (
    <Flex bg="#e9ebf0" h="100vh" id='bg'>
      {location.pathname.split("/")[
        location.pathname.split("/").length - 1
      ] === "login" ? (
        <></>
      ) : (
        <>
          <Sidebar />
        </>
      )}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<Jobspage />} />
        <Route path="/domains" element={<Domainspage />} />
        <Route path="/createjob" element={<CreateJobpage />} />
        <Route path="/users" element={<Userspage />} />
        <Route path="/createuser" element={<CreateUserpage />} />
        <Route path="/editjob/:id" element={<EditJobpage />} />
        <Route path="/appearance" element={<Appearancepage />} />
        <Route path="*" element={<Heading>Page Not Found</Heading>} />
      </Routes>
    </Flex>
  );
}

export default App;
