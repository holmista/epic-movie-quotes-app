import { defineStore } from "pinia";

const useNewsFeedStore = defineStore("news-feed", {
  state: () => ({
    quotes: [],
    filteredQuotes: [],
  }),
  actions: {
    setQuotes(payload) {
      this.quotes = payload;
      this.filteredQuotes = payload;
    },
    filterByQuoteTitle(payload) {
      this.filteredQuotes = this.quotes.filter((quote) =>
        quote.title["en"].toLowerCase().includes(payload.toLowerCase())
      );
    },
    filterByMovieTitle(payload) {
      this.filteredQuotes = this.quotes.filter((quote) =>
        quote.movie.title["en"].toLowerCase().includes(payload.toLowerCase())
      );
    },
  },
});

export default useNewsFeedStore;
