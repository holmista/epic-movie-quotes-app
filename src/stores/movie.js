import { defineStore } from "pinia";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    movies: [],
    filteredMovies: [],
    chosenCategories: [],
    availableCategories: [],
    categoriesError: false,
  }),
  actions: {
    setMovies(payload) {
      this.movies = payload;
      this.filteredMovies = payload;
    },
    setFilteredMovies(payload) {
      this.filteredMovies = payload;
    },
    addMovie(payload) {
      this.movies.push(payload);
    },
    removeMovie(payload) {
      this.movies = this.movies.filter((movie) => movie.id !== payload.id);
      this.filteredMovies = this.filteredMovies.filter(
        (movie) => movie.id !== payload.id
      );
    },
    updateMovie(payload) {
      this.movies = this.movies.map((movie) => {
        if (movie.id === payload.id) {
          return payload;
        }
        return movie;
      });
      this.filteredMovies = this.filteredMovies.map((movie) => {
        if (movie.id === payload.id) {
          return payload;
        }
        return movie;
      });
    },
    filterMovies(payload) {
      this.filteredMovies = this.movies.filter((movie) => {
        // console.log(payload.toLowerCase());
        // console.log(movie.title.en.includes(payload.toLowerCase));
        if (
          movie.title.en.toLowerCase().includes(payload.toLowerCase()) ||
          movie.title.ka.toLowerCase().includes(payload.toLowerCase())
        ) {
          return true;
        }
      });
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
    setCategoriesError(payload) {
      this.categoriesError = payload;
    },
    resetGenres() {
      this.chosenCategories = [];
      this.availableCategories = [];
      this.categoriesError = false;
    },
  },
});
