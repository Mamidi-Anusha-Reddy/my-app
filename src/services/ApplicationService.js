// src/services/applicationService.js
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080";

export async function submitApplicationFormData(formData) {
  // POST multipart/form-data to backend
  const url = `${API_BASE}/api/applications`;
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    // withCredentials: false, // optional
  };
  const res = await axios.post(url, formData, config);
  return res.data;
}
