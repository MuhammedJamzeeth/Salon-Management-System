import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Login from "../pages/auth/Login";

const parseJWT = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    return null;
  }
};

const AuthVerify = (props) => {
  const location = useLocation();
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user) {
      const decodedJwt = parseJWT(user.access_token);
      if (!decodedJwt) {
        setSessionExpired(true);
        props.LogOut();
      }
      console.log(decodedJwt);

      // console.log(decodedJwt.exp * 1000);
      console.log(Date.now());
      if (decodedJwt.exp * 1000 < Date.now()) {
        setSessionExpired(true);

        props.LogOut();
      } else {
        setSessionExpired(false);
        <Login
          sessionExpired={sessionExpired}
          setSessionExpired={setSessionExpired}
        ></Login>;
      }
    }
    return;
  }, [location, props, sessionExpired]);
  return;
};

export default AuthVerify;
