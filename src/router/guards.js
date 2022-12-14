import { useAuthStore } from "../stores/auth";

export const isAuthenticated = (to, from) => {
  const store = useAuthStore();
  if (!store.authenticated) {
    return { name: "forbidden" };
  }
};

export const redirectIfAuthenticated = (to, from) => {
  const store = useAuthStore();
  if (store.authenticated) {
    return { name: "feed" };
  }
};
