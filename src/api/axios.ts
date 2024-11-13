import axios from 'axios';

// Initial Axios instance
const apiClient = axios.create({
  baseURL: localStorage.getItem('apiPath') || 'http://localhost:9000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to update the baseURL dynamically
export const updateApiBaseUrl = () => {
  const apiPath = localStorage.getItem('apiPath') || 'http://localhost:9000';
  apiClient.defaults.baseURL = apiPath;
};

export default apiClient;
