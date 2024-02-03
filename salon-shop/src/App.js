import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Register from "./pages/auth/Register";


function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route element={<Register />} path="register" />
      </Routes>
    </React.Fragment>
  );
}

export default App;
