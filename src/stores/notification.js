import { defineStore } from "pinia";

const useNotificationStore = defineStore("notification", {
  state: () => ({
    notifications: [],
    notificationsAmount: 0,
  }),
  actions: {
    setNotifications(payload) {
      this.notifications = payload;
    },
    addNotification(payload) {
      this.notifications = [payload, ...this.notifications];
      this.notificationsAmount += 1;
    },
  },
});

export default useNotificationStore;
