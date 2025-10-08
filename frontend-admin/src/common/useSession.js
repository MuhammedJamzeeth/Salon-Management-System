import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const parseJWT = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    return null;
  }
};

const useSession = () => {
  const location = useLocation();
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user) {
      const decodedJwt = parseJWT(user.access_token);
      console.log(decodedJwt);
      if (!decodedJwt) {
        setSessionExpired(true);
      }
      // console.log(decodedJwt.exp * 1000);
      console.log(Date.now());
      if (decodedJwt.exp * 1000 < Date.now()) {
        setSessionExpired(true);
      } else {
        setSessionExpired(false);
      }
    }
    return;
  }, [location, sessionExpired]);
  return {
    sessionExpired,
    setSessionExpired,
  };
};

export default useSession;
