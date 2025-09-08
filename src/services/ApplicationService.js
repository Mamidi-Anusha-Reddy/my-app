import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 30000
});

export default api;


import api from './api';

// Submit credit card application
export const submitApplication = async (applicationData, files) => {
  const formData = new FormData();
  
  formData.append('application', JSON.stringify(applicationData));
  formData.append('idProof', files.idProof);
  formData.append('addressProof', files.addressProof);
  formData.append('incomeProof', files.incomeProof);
  
  const response = await api.post('/applications', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

// Get all applications
export const getAllApplications = async () => {
  const response = await api.get('/applications');
  return response.data;
};

// Get application by ID
export const getApplicationById = async (id) => {
  const response = await api.get(`/applications/${id}`);
  return response.data;
};
