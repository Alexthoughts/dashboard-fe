import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  auth: {
    username: "dashboard",
    password: "dashboardapp",
  },
});

export default axiosInstance;
