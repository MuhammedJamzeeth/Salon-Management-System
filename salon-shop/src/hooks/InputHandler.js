import { useState } from "react";

const useInputHandler = (InitialState) => {
  const [formInput, setFormInput] = useState(InitialState);
  const [images, setImages] = useState([]);
  const handleInput = (event) => {
    setFormInput((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleFileChange = (event) => {
    setImages(() => [...event.target.files]);
  };

  return {
    formInput,
    handleInput,
    images,
    handleFileChange,
    setImages,
  };
};

export default useInputHandler;
