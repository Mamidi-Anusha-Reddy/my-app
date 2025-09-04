import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/applications"; // backend endpoint

// Submit application with files
export const submitApplication = (formData) => {
  const data = new FormData();
  Object.keys(formData).forEach((key) => {
    data.append(key, formData[key]);
  });

  return axios.post(API_BASE_URL, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Get application details by ID
export const getApplication = (id) => axios.get(`${API_BASE_URL}/${id}`);

// Get specific document
export const getDocument = (id, docType) =>
  axios.get(`${API_BASE_URL}/${id}/documents/${docType}`, { responseType: "blob" });
