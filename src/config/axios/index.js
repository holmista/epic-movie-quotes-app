import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import router from "@/router/index";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    if (error.response.status == 401) {
      const authStore = useAuthStore();
      authStore.setAuthenticated(false);
      authStore.setName(null);
      authStore.setId(null);
      authStore.setAvatar(null);
      router.push("/");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
