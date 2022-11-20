import { defineStore } from "pinia";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    chosenCategories: [],
    availableCategories: [],
  }),
  actions: {
    setAvailableCategories(payload) {
      this.availableCategories = payload;
    },
    addToChosenCategories(payload) {
      this.chosenCategories.push(payload);
      this.availableCategories = this.availableCategories.filter(
        (category) => category.id !== payload.id
      );
    },
    removeFromChosenCategories(payload) {
      this.chosenCategories = this.chosenCategories.filter(
        (category) => category.id !== payload.id
      );
      this.availableCategories.push(payload);
    },
  },
});
