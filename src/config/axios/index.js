import axios from "axios";
import { get } from "@/hooks/useCookie";

const access_token = get("access_token");

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${access_token}`,
  },
});

export default axiosInstance;
