import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://your-backend-api-url.com/api', // Replace with actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
