import { useState } from "react";

// Custom hook for handling form feilds
const useFields = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData((formData) => {
      return {
        ...formData,
        [name]: value,
      };
    });
  };

  return [formData, handleChange];
};

export default useFields;
