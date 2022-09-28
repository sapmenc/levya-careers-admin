
import { Heading } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateJob from "./components/Job/CreateJob";
import CreateJobpage from "./pages/CreateJobpage";
import Domainspage from "./pages/Domainspage";
import Homepage from "./pages/Homepage";
import Jobspage from "./pages/Jobspage";
import Login from "./pages/Login";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/jobs' element={<Jobspage />} />
        <Route path='/domains' element={<Domainspage />} />
        <Route path='/createjob' element={<CreateJobpage />} />
        <Route path='*' element={<Heading>Page Not Found</Heading>} />
      </Routes>
    </Router>
  );
}

export default App;
