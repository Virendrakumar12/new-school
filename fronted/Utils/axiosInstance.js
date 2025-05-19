import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://new-school-g37a.onrender.com/api', 
  withCredentials: true, // your backend base URL
});

// Automatically attach token
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
