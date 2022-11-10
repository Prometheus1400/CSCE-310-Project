import HomePage from "./pages/HomePage";
import { Route, Routes, Outlet } from "react-router-dom"
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import ApppointmentPage from "./pages/AppointmentPage";
import ReviewPage from "./pages/ReviewPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<>
        <Navbar />
        <Outlet />
      </>}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/appointments" element={<ApppointmentPage />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/users" element={<UserPage />} />
      </Route>
    </Routes>
  );
}

export default App;
