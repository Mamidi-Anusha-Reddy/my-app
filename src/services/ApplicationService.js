import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/applications"; // backend url

// Submit application with files
export const submitApplication = (formData) => {
  const data = new FormData();
  data.append("fullName", formData.fullName);
  data.append("phoneNumber", formData.phoneNumber);
  data.append("email", formData.email);
  data.append("creditCardType", formData.creditCardType);
  data.append("profileType", formData.profileType);
  data.append("idProof", formData.idProof);
  data.append("addressProof", formData.addressProof);
  data.append("incomeProof", formData.incomeProof);

  return axios.post(API_BASE_URL, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Get application details by ID
export const getApplication = (id) => axios.get(`${API_BASE_URL}/${id}`);

// Get document file by type
export const getDocument = (id, docType) =>
  axios.get(`${API_BASE_URL}/${id}/documents/${docType}`, { responseType: "blob" });
