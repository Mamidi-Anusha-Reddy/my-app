import axios from "axios";

const API_BASE_URL = "/api/applications";

export const submitApplication = async (formData) => {
  const data = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    data.append(key, value);
  });

  const response = await axios.post(API_BASE_URL, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
