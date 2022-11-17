import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    secondaryEmails: [],
    primaryEmail: "",
    name: "",
    email: "",
    avatarSrc: "",
  }),
  actions: {
    setSecondaryEmails(payload) {
      this.secondaryEmails = payload;
    },
    setPrimaryEmail(payload) {
      this.primaryEmail = payload;
    },
    setName(payload) {
      this.name = payload;
    },
    setEmail(payload) {
      this.email = payload;
    },
    setAvatarSrc(payload) {
      this.avatarSrc = payload;
    },
    removeSecondaryEmail(payload) {
      this.secondaryEmails = this.secondaryEmails.filter(
        (item) => item.email !== payload
      );
    },
    addSecondaryEmail(payload) {
      this.secondaryEmails.push(payload);
    },
  },
});
