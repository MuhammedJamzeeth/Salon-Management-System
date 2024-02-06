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
import DashBoard from "./pages/Dashboard/DashBoard";

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
    // dispatch never updates so we can ingore it in useEffect dependency array
  }, [pathname, dispatch]);

  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/"
          element={!currentUserValue ? <Login /> : <SharedLayOut />}
        >
          <Route index element={<DashBoard />} path="dashboard" />
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
