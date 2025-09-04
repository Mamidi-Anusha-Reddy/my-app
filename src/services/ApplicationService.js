import axios from "axios";

export const submitApplication = async (formData) => {
  const data = new FormData();
  for (const key in formData) {
    data.append(key, formData[key]);
  }
  const response = await axios.post("/api/applications", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
