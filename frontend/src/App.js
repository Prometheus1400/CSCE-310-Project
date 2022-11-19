import React, { useMemo } from "react";
import HomePage from "./pages/HomePage";
import { Route, Routes, Outlet, BrowserRouter } from "react-router-dom"
import LoginPage from "./components/LogPage/LoginPage"
import SigninPage from "./components/LogPage/SigninPage"
import Navbar from "./components/Navbar";
import ApppointmentPage from "./pages/AppointmentPage";
import ReviewPage from "./pages/ReviewPage";
import UserPage from "./pages/UserPage";
import { UserContext } from "./context/UserContext";
import usePersistentState from "./hooks/usePersistentState";

function App() {
  const [user, setUser] = usePersistentState("user", {
    userID:"",
    isAdmin:false,
  })
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser])

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={userValue}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="signin" element={<SigninPage />} />
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
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
