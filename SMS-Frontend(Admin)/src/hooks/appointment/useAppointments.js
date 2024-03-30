import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { APPOINTMENT_ACTION_TYPES } from "../../constants/appointment.type";

const useAppointments = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emp, setEmp] = useState([]);
  const [services, setServices] = useState([]);
  const user = localStorage.getItem("user");
  const { access_token } = JSON.parse(user);

  const getAllAppointments = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:8080/appointment/view",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log(response.data);
      if (response?.statusText === "OK") {
        throw new Error("Something went wrong");
      } else {
        setLoading(false);
        dispatch({
          type: APPOINTMENT_ACTION_TYPES.SET_APPOINTMENT,
          payload: response.data,
        });
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.code !== "ERR_NETWORK"
          ? error.response?.statusText
          : error.message
      );
    }
  };

  const getEmployee = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/employees"
        // {
        //   headers: {
        //     Authorization: `Bearer ${access_token}`,
        //   },
        // }
      );

      console.log(response.data);
      setEmp(response.data);

      // if (response?.statusText === "OK") {
      //   throw new Error("Something went wrong");
      // } else {
      //   // setLoading(false);
      //   dispatch({
      //     type: APPOINTMENT_ACTION_TYPES.SET_APPOINTMENT,
      //     payload: response.data,
      //   });
      // }
    } catch (error) {
      // setLoading(false);
      setError(
        error.code !== "ERR_NETWORK"
          ? error.response?.statusText
          : error.message
      );
    }
  };

  const getAllServices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/getallservices"
        // {
        //   headers: {
        //     Authorization: `Bearer ${access_token}`,
        //   },
        // }
      );

      console.log(response.data);
      setServices(response.data);

      // if (response?.statusText === "OK") {
      //   throw new Error("Something went wrong");
      // } else {
      //   // setLoading(false);
      //   dispatch({
      //     type: APPOINTMENT_ACTION_TYPES.SET_APPOINTMENT,
      //     payload: response.data,
      //   });
      // }
    } catch (error) {
      // setLoading(false);
      setError(
        error.code !== "ERR_NETWORK"
          ? error.response?.statusText
          : error.message
      );
    }
  };

  return {
    getAllAppointments,
    getEmployee,
    getAllServices,
    emp,
    services,
  };
};

export default useAppointments;
