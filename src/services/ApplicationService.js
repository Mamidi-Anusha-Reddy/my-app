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
