import axios from "axios";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { STAFF_ACTION_TYPES } from "../../constants/staff.type";

export const useAddStaff = (formInput, images, { setIsOpen, isOpen }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isErrorOpen, setIsErrorOpen] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const validationForm = () => {
      const validationErrors = [];

      if (!formInput.name.trim()) {
        validationErrors.push({
          message: "name is required",
          filed: "name",
        });
      }

      if (!formInput.email.trim()) {
        validationErrors.push({
          message: "email is required",
          filed: "email",
        });
      } else if (
        !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formInput.email)
      ) {
        validationErrors.push({
          message: "email is not valid",
          filed: "email",
          id: 2,
        });
      }

      if (!formInput.experience) {
        validationErrors.push({
          message: "experience is required",
          filed: "experience",
          id: 3,
        });
      }

      if (!formInput.working_time) {
        validationErrors.push({
          message: "Work type is required",
          filed: "working_time",
          id: 4,
        });
      }

      setErrors(validationErrors);
    };
    validationForm();
  }, [
    formInput.name,
    formInput.email,
    formInput.experience,
    formInput.working_time,
  ]);

  const addNewStaff = async (event) => {
    event.preventDefault();

    if (errors.length === 0) {
      const user = localStorage.getItem("user");
      const { token } = JSON.parse(user);

      try {
        const formData = new FormData();

        for (const image in images) {
          formData.append("files", images[image]);
        }

        formData.append("name", formInput.name);
        formData.append("email", formInput.email);
        formData.append("working_time", formInput.working_time);
        formData.append("experience", formInput.experience);
        formData.append("about", formInput.about);

        for (const service_special in formInput.service_special) {
          formData.append(
            "service_special",
            formInput.service_special[service_special]
          );
        }

        setLoading(true);
        const response = await axios.post(
          "http://localhost:8080/api/v1/saloon/addStylist",
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
            type: STAFF_ACTION_TYPES.ADD_STAFF,
            payload: response.data,
          });
          setIsOpen(!isOpen);
        }

        setLoading(false);
      } catch (error) {
        setErrors([error.response.data]);
        setLoading(false);
      }
    }
  };

  return {
    addNewStaff,
    loading,
    errors,
    isErrorOpen,
    setIsErrorOpen,
  };
};
