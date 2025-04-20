import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/', // Update if your backend runs on a different port
});

export default axiosInstance;
