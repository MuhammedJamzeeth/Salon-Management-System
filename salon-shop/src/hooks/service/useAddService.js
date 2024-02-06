import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SERVICE_ACTION_TYPES } from "../../constants/service.type";

const useAddNewService = (formInput, images, setIsOpen) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const validationForm = () => {
      const validationErrors = [];

      if (!formInput.serviceTitle.trim()) {
        validationErrors.push({
          message: "Service title is required",
        });
      }

      if (!formInput.serviceType) {
        validationErrors.push({
          message: "Service type is required",
        });
      }

      if (!formInput.gender) {
        validationErrors.push({
          message: "gender is required",
        });
      }

      if (!formInput.price) {
        validationErrors.push({
          message: "Price is required",
        });
      }

      setErrors(validationErrors);
    };
    validationForm();
  }, [
    formInput.serviceTitle,
    formInput.serviceType,
    formInput.gender,
    formInput.price,
  ]);

  const addNewService = async (event) => {
    event.preventDefault();
    const user = localStorage.getItem("user");
    const { token } = JSON.parse(user);

    try {
      if (errors.length === 0) {
        const formData = new FormData();

        for (const image in images) {
          formData.append("files", images[image]);
        }

        formData.append("serviceTitle", formInput.serviceTitle);
        formData.append("serviceType", formInput.serviceType);
        formData.append("gender", formInput.gender);
        formData.append("price", formInput.price);
        formData.append("description", formInput.description);
        formData.append("specialists", formInput.specialists);
        setLoading(true);
        const response = await axios.post(
          "http://localhost:8080/api/v1/saloon/addService",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            // onUploadProgress: (progressEvent) => {
            //   console.log((progressEvent.loaded / progressEvent.total) * 100);
            // },
          }
        );

        if (response.status === 201) {
          dispatch({
            type: SERVICE_ACTION_TYPES.ADD_SERVICE,
            payload: response?.data,
          });
        }

        setLoading(false);
        setIsOpen((isOpen) => !isOpen);
      }
    } catch (error) {
      setErrors([error.response.data]);
      setLoading(false);
    }
  };

  return {
    loading,
    errors,
    addNewService,
  };
};

export default useAddNewService;
