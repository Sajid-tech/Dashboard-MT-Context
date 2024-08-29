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
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route
          path="/registration"
          element={<ProtectedRoute element={<Registration />} />}
        />
        <Route
          path="/participant"
          element={<ProtectedRoute element={<Participant />} />}
        />
        {/* Catch-all route that redirects to the login page */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </>
  );
};

export default App;
