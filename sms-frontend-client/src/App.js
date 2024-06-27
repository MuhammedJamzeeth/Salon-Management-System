import React from "react";
import Home from "./Pages/Home";
import { Route, Routes,Navigate } from "react-router-dom";
import ServicesPage from "./Pages/ServicesPage";
import AboutUsPage from "./Pages/AboutUsPage";
import PersonPage from "./Pages/PersonPage";

function App() {
  return (
    <div className="App">
      <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} /> 
          <Route path="aboutus" element={<AboutUsPage/>}/> 
          <Route path="services" element={<ServicesPage/>}/> 
        
        {/* </Route> */}
        
        <Route path="*" element={<Navigate to="/" />} />
        {/* <Route
          element={!currentUserValue ? <Login /> : <Navigate to="/" />}
          path="login"
        />
        <Route
          element={!currentUserValue ? <Register /> : <Navigate to="/" />}
          path="register"
        /> */}
     
      </Routes>
    </React.Fragment>
    </div>
  );
}

export default App;
