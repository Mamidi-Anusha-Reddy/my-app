import axios from "axios";

// backend base URL (adjust if needed)
const API_BASE_URL = "http://localhost:8080/api/applications";

class ApplicationService {
  // Submit application (with files)
  submitApplication(formData) {
    return axios.post(`${API_BASE_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }

  // Get document file from backend
  getDocument(applicationId, docType) {
    return axios.get(`${API_BASE_URL}/${applicationId}/documents/${docType}`, {
      responseType: "blob", // to handle binary data (pdf/jpg/png)
    });
  }
}

export default new ApplicationService();
