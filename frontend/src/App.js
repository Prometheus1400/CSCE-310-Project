import React from "react";
import {Route, Routes} from "react-router-dom"
import LoginPage from "./components/LogPage/LoginPage"
import SigninPage from "./components/LogPage/SigninPage"
import Home from "./components/MainPage/Home"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signin" element={<SigninPage />} />
      </Routes>
    </div>
  );
}

export default App;
