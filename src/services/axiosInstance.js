import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Change to your backend URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
