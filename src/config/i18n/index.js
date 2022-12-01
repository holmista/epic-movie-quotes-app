import { createI18n } from "vue-i18n";
import en from "@/config/i18n/lang/en/index.js";
import ka from "@/config/i18n/lang/ka/index.js";

const messages = {
  en,
  ka,
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
