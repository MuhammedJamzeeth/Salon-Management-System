import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const parseJWT = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    return null;
  }
};

const AuthVerify = (props) => {
  const loaction = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user) {
      const decodedJwt = parseJWT(user.access_token);
      console.log(decodedJwt);

      console.log(decodedJwt.exp * 1000);
      console.log(Date.now());
      if (decodedJwt.exp * 1000 < Date.now()) {
        props.LogOut();
      }
    }
    return;
  }, [loaction, props]);
  return;
};

export default AuthVerify;
