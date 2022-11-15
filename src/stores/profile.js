import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({ secondaryEmails: [], primaryEmail: "" }),
  actions: {
    setSecondaryEmails(payload) {
      this.secondaryEmails = payload;
    },
    setPrimaryEmail(payload) {
      this.primaryEmail = payload;
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
