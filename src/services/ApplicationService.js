import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/applications"; // backend endpoint

export const submitApplication = (formData) => {
  const data = new FormData();
  Object.keys(formData).forEach((key) => {
    data.append(key, formData[key]);
  });

  return axios.post(API_BASE_URL, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

import { submitApplication } from "../services/apiService";  // ⬅️ at top of file

// Final submission after confirmation page
const handleFinalSubmit = async () => {
  try {
    const response = await submitApplication(formData);
    console.log("Application saved:", response.data);
    setFinalSubmit(true);
  } catch (error) {
    console.error("Error submitting application:", error);
    alert("Something went wrong while submitting. Please try again.");
  }
};

