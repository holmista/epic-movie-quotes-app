import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: null,
    name: null,
    id: null,
    avatar: null,
  }),
  actions: {
    setAuthenticated(payload) {
      this.authenticated = payload;
    },
    setName(payload) {
      this.name = payload;
    },
    setId(payload) {
      this.id = payload;
    },
    setAvatar(payload) {
      this.avatar = payload;
    },
  },
});
