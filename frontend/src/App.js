import HomePage from "./pages/HomePage";
import { Route, Routes, Outlet, BrowserRouter } from "react-router-dom"
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import ApppointmentPage from "./pages/AppointmentPage";
import ReviewPage from "./pages/ReviewPage";
import UserPage from "./pages/UserPage";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<div className="routeContainerDiv">
            <Navbar />
            <Outlet />
          </div>}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/appointments" element={<ApppointmentPage />} />
            <Route path="/reviews" element={<ReviewPage />} />
            <Route path="/users" element={<UserPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
