import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import SignIn from "./pages/auth/SignIn";
import SIgnUp from "./pages/auth/SIgnUp";
import Maintenance from "./pages/maintenance/Maintenance";
import Registration from "./pages/dashboard/Registration";
import Participant from "./pages/dashboard/Participant";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SIgnUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/participant" element={<Participant />} />
      </Routes>
    </>
  );
};

export default App;
