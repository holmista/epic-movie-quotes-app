import { useAuthStore } from "../stores/auth";

export const isAuthenticated = (to, from, next) => {
  const store = useAuthStore();
  if (!store.authenticated) {
    return { name: "landing" };
  }
  next();
};
