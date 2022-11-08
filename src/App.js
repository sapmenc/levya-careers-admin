
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

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/jobs' element={<Jobspage />} />
          <Route path='/domains' element={<Domainspage />} />
          <Route path='/createjob' element={<CreateJobpage />} />
          <Route path='/users' element={<Userspage />} />
          <Route path='/createuser' element={<CreateUserpage />} />
          <Route path='/editjob/:id' element={<EditJobpage />} />
          <Route path='*' element={<Heading>Page Not Found</Heading>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
