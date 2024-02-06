import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SERVICE_ACTION_TYPES } from "../../constants/service.type";

const useService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const services = useSelector((state) => state.services.current_services);

  const getAllServices = async () => {
    const user = localStorage.getItem("user");
    const { token } = JSON.parse(user);
    setLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/saloon/getServices",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.statusText !== "OK") {
        throw new Error("Something went wrong");
      } else {
        setLoading(false);
        dispatch({
          type: SERVICE_ACTION_TYPES.SET_SERVICE,
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

  const deleteService = async (_id) => {
    try {
      const service_id = _id;
      const user = localStorage.getItem("user");
      const { token } = JSON.parse(user);

      setLoading(true);
      const res = await axios.delete(
        `http://localhost:8080/api/v1/saloon/removeService/${service_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res?.data?._id);
      setLoading(false);

      const filteredServices = services.filter(
        (service) => service._id !== res?.data?._id
      );

      dispatch({
        type: SERVICE_ACTION_TYPES.DELETE_SERVICE,
        payload: filteredServices,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getAllServices,
    deleteService,
    loading,
    error,
  };
};

export default useService;
