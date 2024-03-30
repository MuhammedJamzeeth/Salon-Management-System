import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../actions/user.action";

const useAuthHandler = (formInput) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { title, email, password, confirmPassword, phone, zip, address } =
    formInput;

  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const register = async (event) => {
    event.preventDefault();

    let emptyFileds = [];

    if (!title) emptyFileds.push("Title");
    if (!email) emptyFileds.push("Email");
    if (!password) emptyFileds.push("Password");
    if (!confirmPassword) emptyFileds.push("Confirm Password");
    if (!phone) emptyFileds.push("Phone");
    // if (!shopNo) emptyFileds.push("Address Line 1");
    // if (!street) emptyFileds.push("Address Line 2");
    // if (!city) emptyFileds.push("City");
    if (!zip) emptyFileds.push("Zip/Postal Code");

    if (emptyFileds.length > 0) {
      setError(`${[...emptyFileds]} can't be empty`);
      return;
    } else {
      setError("");
    }

    if (password !== confirmPassword) {
      setError("Password does not match");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phone);
    formData.append("title", title);
    formData.append("address", address);
    formData.append("zip", zip);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register_shop",
        formData
      );

      if (
        response.status === 201 ||
        response.status === 200 ||
        response.statusText === "OK"
      ) {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch(setCurrentUser(response.data));
      }
      const user = localStorage.getItem("user");
      console.log(user);
      console.log("user registered");
      console.log(response.data.access_token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // console.log(error);
      setError(error.response.data);
    }
  };

  const login = async (event) => {
    event.preventDefault();
    let emptyFileds = [];
    if (!email) emptyFileds.push("Email");
    if (!password) emptyFileds.push("Password");

    if (emptyFileds.length > 0) {
      setError(`${[...emptyFileds]} can't be empty`);
      return;
    } else {
      setError("");
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          ...formInput,
        }
      );

      if (response.status === 200 || response.statusText === "OK") {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(localStorage.getItem("user"));
        dispatch(setCurrentUser(response.data));
      }
      setLoading(false);
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
    }
  };

  return {
    register,
    loading,
    error,
    setError,
    handleFileChange,
    login,
  };
};

export default useAuthHandler;
