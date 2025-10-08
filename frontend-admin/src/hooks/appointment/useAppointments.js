import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { APPOINTMENT_ACTION_TYPES } from "../../constants/appointment.type";

const useAppointments = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [errorDl, setErrorDl] = useState([]);

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

  const setApprove = async (isApprove, id) => {
    console.log(isApprove);
    try {
      const response = await axios.post(
        `http://localhost:8080/appointment/setApprove/${id}`,
        isApprove,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      // getAllAppointments();
      console.log(response.data);
      if (response?.statusText === "OK") {
        throw new Error("Something went wrong");
      } else {
        setLoading(false);
        dispatch({
          type: APPOINTMENT_ACTION_TYPES.UPDATE_APPOINTMENT,
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

  // const removeAppointment = async (id) => {
  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:8080/appointment/delete/${id}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${access_token}`,
  //         },
  //       }
  //     );
  //     // getAllAppointments();
  //     console.log(response.data);
  //     setErrorDl(response.data);
  //     if (response?.statusText === "OK") {
  //       throw new Error("Something went wrong");
  //     } else {
  //       setLoading(false);
  //       dispatch({
  //         type: APPOINTMENT_ACTION_TYPES.DELETE_APPOINTMENT,
  //         payload: response.data,
  //       });
  //       return response.data;
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     setError(
  //       error.code !== "ERR_NETWORK"
  //         ? error.response?.statusText
  //         : error.message
  //     );
  //   }
  //   return null;
  // };

  return {
    getAllAppointments,
    getEmployee,
    getAllServices,
    emp,
    services,
    setApprove,
    // removeAppointment,
    errorDl,
  };
};

export default useAppointments;
