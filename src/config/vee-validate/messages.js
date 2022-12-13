import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import en from "@vee-validate/i18n/dist/locale/en.json ";
import ka from "@vee-validate/i18n/dist/locale/ka.json ";

configure({
  generateMessage: localize({
    en: {
      ...en,
      names: {
        ...en.names,
        movie_title_en: "English movie title",
        movie_title_ka: "Georgian movie title",
        director_en: "English director name",
        director_ka: "Georgian director name",
        release_year: "Release year",
        description_en: "English movie description",
        description_ka: "Georgian movie description",
        quote_ka: "Georgian quote",
        quote_en: "English quote",
      },
      messages: {
        ...en.messages,
        lower: "The {field} field must be lower case",
      },
    },
    ka: {
      ...ka,
      names: {
        email: "იმეილი",
        password: "პაროლი",
        name: "სახელი",
        confirmPassword: "გაიმეორე პაროლი",
        movie_title_en: "ფილმის ინგლისური სახელი",
        movie_title_ka: "ფილმის ქართული სახელი",
        director_en: "რეჟისორის ინგლისური სახელი",
        director_ka: "რეჟისორის ქართული სახელი",
        release_year: "გამოშვების წელი",
        budget: "ბიუჯეტი",
        description_en: "ფილმის ინგლისური აღწერა",
        description_ka: "ფილმის ქართული აღწერა",
        avatar: "ავატარი",
        quote_ka: "ქართული ციტატა",
        quote_en: "ინგლისური ციტატა",
        movie: "ფილმი",
      },
      messages: {
        ...ka.messages,
        lower: "{field} უნდა იყოს პატარა ასოებით",
        same: "{field} არ არის ვალიდური",
      },
    },
  }),
});
