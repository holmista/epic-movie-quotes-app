import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import router from "@/router/index";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      const authStore = useAuthStore();
      authStore.setAuthenticated(false);
      // this should redirect on 401 error page
      router.push("/");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
