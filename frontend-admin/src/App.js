  import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { currentUser } from "./selectors/user.selector";
import useLogOut from "./hooks/user.logout";
import { setCurrentUser } from "./actions/user.action";
import SharedLayOut from "./pages/Shared/ShardLayOut";
import AuthVerify from "./common/AuthVerify";
// import DashBoard from "./pages/Dashboard/DashBoard";
import Appointments from "./pages/Appoinments/Appoinment";
import Staff from "./pages/Staffs/Staff";
import Service from "./pages/Services/Service";
import Inventory from "./pages/Inventory/Inventory";
// import AddStaff from "./components/Staff/Adddstaff";
import MainDashBoard from "./pages/MyDashboard/MyDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestimonialsPage from "./pages/Reviews/TestimonialsPage";
import Financial from "./pages/Financials/Financial";
import Attendance from "./pages/Attendence/Attendance";
import Contact from "./pages/Contact/Contact";

function App() {
  const dispatch = useDispatch();
  const currentUserValue = useSelector(currentUser);
  const { pathname } = useLocation();
  const { LogOut } = useLogOut();
  useEffect(() => {
    const user = localStorage.getItem("user");
    dispatch(setCurrentUser(JSON.parse(user)));
    dispatch({
      type: "SET_CURRENT_PAGE",
      payload: pathname === "/" ? "dashboard" : pathname.split("/")[1],
    });
    // dispatch never updates so we can ignore it in useEffect dependency array
  }, [pathname, dispatch]);

  return (
    <React.Fragment>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={!currentUserValue ? <Login /> : <SharedLayOut />}
        >
          <Route index element={<MainDashBoard />} path="/" />
          <Route path="/appointments" element={<Appointments />} />
          <Route index element={<Staff />} path="staffs" />
          <Route path="services" element={<Service />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="reviews" element={<TestimonialsPage />} />
          <Route path="finances" element={<Financial />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="settings" element={<Contact />} />
        </Route>

        <Route
          element={!currentUserValue ? <Login /> : <Navigate to="/" />}
          path="login"
        />
        <Route
          element={!currentUserValue ? <Register /> : <Navigate to="/" />}
          path="register"
        />
      </Routes>
      <AuthVerify LogOut={LogOut} />
    </React.Fragment>
  );
}

export default App;
