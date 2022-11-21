import { defineStore } from "pinia";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    movies: [],
    chosenCategories: [],
    availableCategories: [],
  }),
  actions: {
    setMovies(payload) {
      this.movies = payload;
    },
    addMovie(payload) {
      this.movies.push(payload);
    },
    removeMovie(payload) {
      this.movies = this.movies.filter((movie) => movie.id !== payload.id);
    },
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
