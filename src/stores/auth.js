import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: null,
  }),
  actions: {
    setAuthenticated(payload) {
      this.authenticated = payload;
    },
  },
});
