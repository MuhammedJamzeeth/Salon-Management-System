import React from "react";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./Components/About";

function App() {
  return (
    <div className="App">
      {/* <Reviews /> */}
      {/* <Home/> */}
      {/* <Footer /> */}
      <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} >
          {/* <Route index path="/" element={<Home />}></Route> */}
        
        </Route>
        <Route path="aboutus" element={<AboutUs/>}/> <Route/>

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
