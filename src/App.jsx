import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import SignIn from "./pages/auth/SignIn";
import Maintenance from "./pages/maintenance/Maintenance";
import Registration from "./pages/dashboard/Registration";
import Participant from "./pages/dashboard/Participant";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route
          path="/registration"
          element={<ProtectedRoute element={<Registration />} />}
        />
        <Route
          path="/participant"
          element={<ProtectedRoute element={<Participant />} />}
        />
      </Routes>
    </>
  );
};

export default App;
